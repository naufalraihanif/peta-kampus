// src/components/Search.jsx

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

function Search({ searchTerm, setSearchTerm, features, onSelectFeature }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // 1. Logika Filter Pencarian
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Filter fitur berdasarkan nama (case-insensitive)
    // Batasi 5 hasil teratas
    if (features) {
      const filtered = features.filter(feature => 
        feature.properties.nama && 
        feature.properties.nama.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); 
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    }
  }, [searchTerm, features]);

  // 2. Event Listener untuk menutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // 3. Handle Klik Item Rekomendasi
  const handleSelect = (feature) => {
    setSearchTerm(feature.properties.nama); // Isi input dengan nama yang dipilih
    setShowSuggestions(false); // Tutup dropdown
    onSelectFeature(feature); // Panggil fungsi di MapPage untuk zoom & buka sidebar
  };

  // 4. Handle Clear Input
  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="w-100 position-relative" style={{ maxWidth: '400px' }}>
      
      {/* INPUT GROUP */}
      <div ref={wrapperRef} className="w-100 position-relative" style={{ maxWidth: '400px' }}>
      
      {/* INPUT GROUP */}
      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white border-0 ps-3 text-muted rounded-start-pill">
          <FaSearch />
        </span>
        <input
          type="text"
          className={`form-control border-0 bg-white shadow-none ${searchTerm ? '' : 'rounded-end-pill'} pe-3`}
          placeholder="Cari gedung atau fasilitas..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          style={{ fontSize: '14px', height: '40px' }}
        />
        
        {/* Tombol Clear (muncul jika ada teks) */}
        {searchTerm && (
           <button 
             className="btn bg-white border-0 text-muted rounded-end-pill" 
             onClick={handleClear}
             type="button"
           >
             <FaTimes />
           </button>
        )}
      </div>
      </div>

      {/* DROPDOWN REKOMENDASI */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="position-absolute top-100 start-0 w-100 mt-2 bg-white rounded-3 shadow-lg overflow-hidden border border-light" style={{ zIndex: 1060 }}>
          <ul className="list-group list-group-flush mb-0">
            {suggestions.map((feature, index) => (
              <li 
                key={index}
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 px-3 py-2 border-0"
                onClick={() => handleSelect(feature)}
                style={{ cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {/* Ikon Marker Kecil */}
                <div className="bg-light p-2 rounded-circle text-danger">
                  <FaMapMarkerAlt size={12} />
                </div>
                
                {/* Info Gedung */}
                <div className="d-flex flex-column text-truncate">
                  <span className="fw-semibold text-dark text-truncate" style={{fontSize: '14px'}}>
                    {feature.properties.nama}
                  </span>
                  
                  {/* Tampilkan Kategori (jika ada) */}
                  {feature.properties.kategori && (
                     <small className="text-muted text-truncate" style={{fontSize: '11px'}}>
                       {Array.isArray(feature.properties.kategori) 
                         ? feature.properties.kategori.join(', ') 
                         : feature.properties.kategori}
                     </small>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;