import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

function Map({ initialStyle, onMapLoad, selectedBuilding }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; 

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: initialStyle,
      center: [105.2309, -5.3566],
      zoom: 16.5,
      pitch: 0,
      maxBounds: [ [105.2166, -5.3627], [105.2423, -5.3466] ] 
    });

    if (onMapLoad) {
      onMapLoad(map.current);
    }
    
  }, []); 


  useEffect(() => {
    if (!map.current || !selectedBuilding) return;
    try {
      const firstCoordinate = selectedBuilding.geometry.coordinates[0][0];
      map.current.flyTo({ center: firstCoordinate, essential: true, padding: { left: 340 } });
    } catch (e) {
      console.error("Gagal melakukan flyTo, koordinat tidak valid:", selectedBuilding);
    }
  }, [selectedBuilding]);

  return (
    <div 
      ref={mapContainer} 
      className="map-container" 
      style={mapContainerStyle} 
    />
  );
}

export default Map;