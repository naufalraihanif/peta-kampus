// src/pages/MapPage.jsx

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Map from '../components/Map'; 
import Sidebar from '../components/Sidebar';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import PathFinder from 'geojson-path-finder';
import * as turf from '@turf/turf';

function MapPage({ mapStyle: propMapStyle, searchTerm: propSearchTerm }) {
  
  // --- STATE DATA ---
  const [gedungData, setGedungData] = useState(null);
  const [lahanData, setLahanData] = useState(null);
  const [kawasanPolinela, setKawasanPolinela] = useState(null);
  
  const [jalanVisual, setJalanVisual] = useState(null);
  const [jalanNavigasi, setJalanNavigasi] = useState(null);

  // State UI
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [layersReady, setLayersReady] = useState(false);

  // State Navbar & Navigasi
  const [mapStyle, setMapStyle] = useState(propMapStyle || 'mapbox://styles/mapbox/satellite-streets-v12');
  const [searchTerm, setSearchTerm] = useState(propSearchTerm || '');
  
  const [startNode, setStartNode] = useState(null);
  const [routeData, setRouteData] = useState(null);
  
  // Refs
  const pathFinderRef = useRef(null);
  const listenersAdded = useRef(false);
  const allFeaturesRef = useRef([]);
  const isInitialMapLoad = useRef(true);
  const hoveredFeature = useRef({ id: null, source: null });

  // 1. FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gedungRes, lahanRes, kawasanRes, jalanVisualRes, jalanNavigasiRes] = await Promise.all([
          fetch('/data/gedung.geojson'),
          fetch('/data/lahan.geojson'),
          fetch('/data/polinela.geojson'),
          fetch('/data/jalan.geojson'),
          fetch('/data/line.geojson')
        ]);

        setGedungData(await gedungRes.json());
        setLahanData(await lahanRes.json());
        setKawasanPolinela(await kawasanRes.json());
        setJalanVisual(await jalanVisualRes.json());
        setJalanNavigasi(await jalanNavigasiRes.json());
      } catch (error) {
        console.error("❌ Gagal memuat data lokal:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  // 2. INIT PATHFINDER
  useEffect(() => {
    if (jalanNavigasi) {
      console.log("🛣️ Menginisialisasi jaringan rute...");
      pathFinderRef.current = new PathFinder(jalanNavigasi, { precision: 1e-4 });
    }
  }, [jalanNavigasi]);

  // 3. MEMOIZE FEATURES
  const allFeatures = useMemo(() => {
    if (!gedungData || !lahanData) return [];
    return [...gedungData.features, ...lahanData.features];
  }, [gedungData, lahanData]);
  
  // Update ref untuk akses di listener
  useEffect(() => {
      allFeaturesRef.current = allFeatures;
  }, [allFeatures]);

  // 4. FILTER LOGIC
  const filteredFeatures = useMemo(() => {
    const currentSearchTerm = searchTerm || ''; 
    return allFeatures.filter(
      b => b.properties.nama && b.properties.nama.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );
  }, [allFeatures, searchTerm]);

  // 5. INVERTED MASK
  const invertedKawasan = useMemo(() => {
    if (!kawasanPolinela) return null;
    try {
      const campusRing = kawasanPolinela.features[0].geometry.coordinates[0];
      const worldRing = [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]];
      return {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: { type: 'Polygon', coordinates: [worldRing, campusRing] }, properties: {} }]
      };
    } catch (e) { return null; }
  }, [kawasanPolinela]);

  // 6. FILTER LAYERS
  const filterLayers = (map) => {
    if (!map || !layersReady || !map.getSource('gedung-source')) return;
    
    const filteredGedung = { ...gedungData, features: gedungData.features.filter(f => filteredFeatures.some(ff => ff.properties.id === f.properties.id)) };
    map.getSource('gedung-source').setData(filteredGedung);

    const filteredLahan = { ...lahanData, features: lahanData.features.filter(f => filteredFeatures.some(ff => ff.properties.id === f.properties.id)) };
    map.getSource('lahan-source').setData(filteredLahan);
  };

  // 7. SETUP LAYERS
  const setupLayers = (map) => {
    if (!gedungData || !lahanData || !kawasanPolinela || !jalanVisual || !jalanNavigasi || !invertedKawasan) return;
    setLayersReady(false); 

    const layersToRemove = ['gedung-layer', 'gedung-outline', 'lahan-layer', 'lahan-outline', 'jalan-visual-layer', 'jalan-navigasi-layer', 'kawasan-mask-layer', 'kampus-outline-layer', 'route-layer'];
    const sourcesToRemove = ['gedung-source', 'lahan-source', 'jalan-visual-source', 'jalan-navigasi-source', 'kawasan-mask-source', 'kampus-outline-source', 'route-source'];
    layersToRemove.forEach(id => { if (map.getLayer(id)) map.removeLayer(id); });
    sourcesToRemove.forEach(id => { if (map.getSource(id)) map.removeSource(id); });

    // Layer Mask
    map.addSource('kawasan-mask-source', { type: 'geojson', data: invertedKawasan });
    map.addLayer({ id: 'kawasan-mask-layer', type: 'fill', source: 'kawasan-mask-source', paint: { 'fill-color': '#d1d1d1', 'fill-opacity': 0.8 } });
    
    map.addSource('kampus-outline-source', { type: 'geojson', data: kawasanPolinela });
    map.addLayer({ id: 'kampus-outline-layer', type: 'line', source: 'kampus-outline-source', paint: { 'line-color': '#4a5157', 'line-width': 1 } });

    // Layer Jalan Visual (Hitam)
    map.addSource('jalan-visual-source', { type: 'geojson', data: jalanVisual });
    map.addLayer({ id: 'jalan-visual-layer', type: 'line', source: 'jalan-visual-source', paint: { 'line-color': 'black', 'line-width': 1 } });

    // Layer Jalan Navigasi (Invisible)
    map.addSource('jalan-navigasi-source', { type: 'geojson', data: jalanNavigasi });
    map.addLayer({ id: 'jalan-navigasi-layer', type: 'line', source: 'jalan-navigasi-source', layout: { 'visibility': 'none' }, paint: { 'line-color': 'red', 'line-width': 2 } });
    
    // Layer Gedung & Lahan
    map.addSource('gedung-source', { type: 'geojson', data: gedungData, promoteId: 'id' });
    map.addLayer({ id: 'gedung-layer', type: 'fill', source: 'gedung-source', paint: { 'fill-color': '#b2a8a8', 'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.7, 0.4] } });
    map.addLayer({ id: 'gedung-outline', type: 'line', source: 'gedung-source', paint: { 'line-color': '#272323', 'line-width': 1 }});
    
    map.addSource('lahan-source', { type: 'geojson', data: lahanData, promoteId: 'id' });
    map.addLayer({ id: 'lahan-layer', type: 'fill', source: 'lahan-source', paint: { 'fill-color': '#008329', 'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.7, 0.4] } });
    map.addLayer({ id: 'lahan-outline', type: 'line', source: 'lahan-source', paint: { 'line-color': '#00470f', 'line-width': 1 }});
    
    setLayersReady(true); 
    filterLayers(map); 
  };

  // 8. NAVIGASI
  const handleSetStart = () => {
    if (selectedBuilding) {
      setStartNode(selectedBuilding);
      setRouteData(null); 
      alert(`Titik Awal: ${selectedBuilding.properties.nama}. Sekarang pilih gedung tujuan.`);
    }
  };

// --- FUNGSI BARU (DIPERBAIKI): Snap ke Vertex ---
  const handleSetEnd = () => {
    // 1. Validasi Data
    if (!startNode || !selectedBuilding) {
      alert("Pilih titik awal terlebih dahulu!");
      return;
    }
    if (!pathFinderRef.current || !jalanNavigasi) {
      alert("Data navigasi belum siap. Tunggu sebentar.");
      return;
    }

    try {
        console.log("🏁 Memulai kalkulasi rute (Metode: Vertex Snap)...");

        // 2. Siapkan Titik Tengah Gedung
        const startCenter = turf.center(startNode);
        const endCenter = turf.center(selectedBuilding);

        // 3. --- PERBAIKAN UTAMA DI SINI ---
        // Kita "ledakkan" (explode) semua garis jalan menjadi titik-titik (vertices)
        // Ini memastikan kita hanya memilih titik yang BENAR-BENAR ADA di jaringan jalan
        const networkVertices = turf.explode(jalanNavigasi);

        // Cari titik simpul jalan yang paling dekat dengan gedung
        const nearestStartVertex = turf.nearestPoint(startCenter, networkVertices);
        const nearestEndVertex = turf.nearestPoint(endCenter, networkVertices);

        // 4. Validasi Snapping
        if (!nearestStartVertex || !nearestEndVertex) {
             console.error("Gagal menemukan simpul jalan terdekat.");
             alert("Gagal menemukan akses jalan terdekat.");
             return;
        }

        console.log("📍 Start Node:", nearestStartVertex.geometry.coordinates);
        console.log("📍 End Node:", nearestEndVertex.geometry.coordinates);

        // 5. Hitung Rute
        // Library geojson-path-finder lebih suka menerima objek Feature Point
        const path = pathFinderRef.current.findPath(nearestStartVertex, nearestEndVertex);

        // 6. Gambar Hasil
        if (path && path.path) {
            console.log("✅ Rute Ditemukan!", path);
            const routeGeoJSON = {
                type: 'Feature',
                properties: {},
                geometry: { type: 'LineString', coordinates: path.path }
            };
            setRouteData(routeGeoJSON);
        } else {
            console.warn("⚠️ Jalur tidak ditemukan.");
            alert("Jalur tidak ditemukan! Kemungkinan garis jalan terputus atau tidak menyambung.");
            setRouteData(null);
        }
    } catch (error) {
        console.error("❌ Error saat navigasi:", error);
        alert("Terjadi kesalahan sistem saat menghitung rute.");
    }
  };
  
  const handleResetNavigation = () => {
      setStartNode(null);
      setRouteData(null);
  };

  // 9. EFFECT GAMBAR RUTE (DIPERBAIKI: PADDING LEBIH BESAR UNTUK MOBILE)
  useEffect(() => {
    if (!mapInstance || !layersReady) return;
    const sourceId = 'route-source'; const layerId = 'route-layer';

    if (routeData) {
      if (mapInstance.getSource(sourceId)) {
        mapInstance.getSource(sourceId).setData(routeData);
      } else {
        mapInstance.addSource(sourceId, { type: 'geojson', data: routeData });
        mapInstance.addLayer({
          id: layerId, type: 'line', source: sourceId,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#00a6ff', 'line-width': 5, 'line-opacity': 0.9 }
        });
      }

      // Responsive FitBounds Rute
      try {
          const bbox = turf.bbox(routeData);
          const isMobile = window.innerWidth < 768;
          // PERBAIKAN: Padding bawah ditingkatkan ke 70% di mobile
          const padding = isMobile 
            ? { top: 50, bottom: window.innerHeight * 0.7, left: 20, right: 20 } 
            : { top: 50, bottom: 50, left: 390, right: 50 };
          mapInstance.fitBounds(bbox, { padding, maxZoom: 19, duration: 1500 });
      } catch (e) { console.error("Gagal fitBounds:", e); }

    } else {
      if (mapInstance.getLayer(layerId)) mapInstance.removeLayer(layerId);
      if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);
    }
  }, [routeData, mapInstance, layersReady]);

  // 10. LISTENER SETUP
  useEffect(() => {
    if (!mapInstance || listenersAdded.current) return;
    mapInstance.on('load', () => setupLayers(mapInstance));
    mapInstance.on('style.load', () => setupLayers(mapInstance));

    const interactiveLayers = [{ id: 'gedung-layer', source: 'gedung-source' }, { id: 'lahan-layer', source: 'lahan-source' }];
    interactiveLayers.forEach(({ id, source }) => {
      mapInstance.on('click', id, (e) => {
        if (e.features.length > 0) {
          const clickedId = e.features[0].id; 
          const feat = allFeaturesRef.current.find(f => f.properties.id === clickedId);
          if (feat) setSelectedBuilding(feat);
        }
      });
      mapInstance.on('mouseenter', id, (e) => {
        mapInstance.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (hoveredFeature.current.id) mapInstance.setFeatureState({ source: hoveredFeature.current.source, id: hoveredFeature.current.id }, { hover: false });
          const featureId = e.features[0].id; 
          mapInstance.setFeatureState({ source: source, id: featureId }, { hover: true });
          hoveredFeature.current = { id: featureId, source: source };
        }
      });
      mapInstance.on('mouseleave', id, () => {
        mapInstance.getCanvas().style.cursor = '';
        if (hoveredFeature.current.id) mapInstance.setFeatureState({ source: hoveredFeature.current.source, id: hoveredFeature.current.id }, { hover: false });
        hoveredFeature.current = { id: null, source: null };
      });
    });
    listenersAdded.current = true;
  }, [mapInstance, gedungData, lahanData, kawasanPolinela, jalanVisual, jalanNavigasi, invertedKawasan]);

  useEffect(() => { if (isInitialMapLoad.current) { isInitialMapLoad.current = false; return; } if (mapInstance && mapStyle) mapInstance.setStyle(mapStyle); }, [mapStyle, mapInstance]);
  useEffect(() => { if (!mapInstance || !layersReady) return; filterLayers(mapInstance); }, [filteredFeatures, mapInstance, layersReady]); 

  // 11. FLY TO (DIPERBARUI: Menggunakan Center Gedung & Padding Besar)
  useEffect(() => {
    if (!mapInstance || !selectedBuilding) return;
    try {
        // PERBAIKAN: Gunakan turf.center agar kamera fokus ke tengah gedung, bukan sudutnya
        const centerPoint = turf.center(selectedBuilding).geometry.coordinates;
        
        const isMobile = window.innerWidth < 768;
        // PERBAIKAN: Padding bawah 70% agar gedung muncul di atas sidebar
        const padding = isMobile 
            ? { top: 20, bottom: window.innerHeight * 0.7, left: 20, right: 20 }
            : { left: 360, top: 20, bottom: 20, right: 20 };

        mapInstance.easeTo({ center: centerPoint, padding: padding, zoom: 17.5, duration: 1500 });
    } catch (e) { console.error("Gagal flyTo:", e); }
  }, [selectedBuilding, mapInstance]);

  const handleCloseSidebar = () => {
      setSelectedBuilding(null);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="app-container"> 
      <Navbar currentStyle={mapStyle} setMapStyle={setMapStyle}>
        <Search 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          features={allFeatures}
          onSelectFeature={(feature) => {
            setSelectedBuilding(feature);
            setStartNode(null); 
            setRouteData(null);
          }}
        />
      </Navbar>

      <div className="map-page-layout">
        <Sidebar 
            building={selectedBuilding} 
            onClose={handleCloseSidebar} 
            startNode={startNode}
            onSetStart={handleSetStart}
            onSetEnd={handleSetEnd}
            onReset={handleResetNavigation}
        />
        <Map 
          initialStyle={mapStyle} 
          onMapLoad={setMapInstance} 
          selectedBuilding={selectedBuilding}
        />
      </div>
    </div>
  );
}

export default MapPage;