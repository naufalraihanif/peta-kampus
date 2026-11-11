// src/components/Sidebar.jsx

import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaDirections, FaTimesCircle } from 'react-icons/fa';
import './Sidebar.css'; 

function Sidebar({ building, onClose, startNode, onSetStart, onSetEnd, onReset }) {
  if (!building) return null;

  const { properties } = building;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => { setCurrentIndex(0); }, [building]);

  const hasImages = properties.foto_urls && properties.foto_urls.length > 0;
  const canSlide = hasImages && properties.foto_urls.length > 1;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % properties.foto_urls.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + properties.foto_urls.length) % properties.foto_urls.length);
  
  const isStartNode = startNode && startNode.properties.id === properties.id;

  return (
    <div className="sidebar-container">
      
      {/* Header Gambar */}
      <div className="sidebar-image-container">
        <button onClick={onClose} className="sidebar-close-btn">
          <FaTimes />
        </button>

        {hasImages ? (
          <>
            <img 
              src={properties.foto_urls[currentIndex]} 
              alt={properties.nama} 
              className="sidebar-image"
            />
            {canSlide && (
              <>
                <button onClick={handlePrev} className="slider-btn prev"><FaChevronLeft /></button>
                <button onClick={handleNext} className="slider-btn next"><FaChevronRight /></button>
                
                {/* Indikator titik */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1">
                   {properties.foto_urls.map((_, idx) => (
                     <div key={idx} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)' }}></div>
                   ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted bg-light">
            <div className="text-center">
              <FaMapMarkerAlt size={30} className="mb-2 opacity-25" />
              <p className="small m-0">Tidak ada gambar</p>
            </div>
          </div>
        )}
      </div>

      {/* Konten Scrollable */}
      <div className="sidebar-content">
        <h4 className="fw-bold text-dark mb-2 fs-5">{properties.nama}</h4>
        
        {/* Kategori */}
        {properties.kategori && (
          <div className="mb-3 d-flex flex-wrap gap-1">
            {Array.isArray(properties.kategori) ? properties.kategori.map((kat, i) => (
                <span key={i} className="badge bg-primary bg-opacity-10 text-primary rounded-pill fw-normal px-3 py-2">
                  {kat}
                </span>
            )) : (
              <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill fw-normal px-3 py-2">
                {properties.kategori}
              </span>
            )}
          </div>
        )}
        
        {/* Deskripsi */}
        {properties.deskripsi && (
          <div>
            <h6 className="fw-bold text-dark mb-1" style={{fontSize: '0.9rem'}}>Info Detail</h6>
            {/* PERUBAHAN DI SINI: Menggunakan class sidebar-description */}
            <p className="sidebar-description text-secondary m-0">
              {properties.deskripsi}
            </p>
          </div>
        )}

        {/* Panel Navigasi */}
        <div className="card border-0 bg-light rounded-3 mb-3 mt-3">
          <div className="card-body p-3">
            <h6 className="fw-bold text-uppercase text-muted small mb-2" style={{fontSize: '0.75rem'}}>Navigasi</h6>
            
            {!startNode ? (
              <button onClick={onSetStart} className="btn btn-success btn-sm w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2">
                <FaMapMarkerAlt /> Mulai dari sini
              </button>
            ) : (
              <div className="d-flex flex-column gap-2">
                <div className="alert alert-success py-2 px-3 mb-0 small d-flex align-items-center gap-2">
                   <FaMapMarkerAlt size={12} /> 
                   <div className="text-truncate" style={{maxWidth: '200px'}}>Dari: <strong>{startNode.properties.nama}</strong></div>
                </div>
                
                {!isStartNode ? (
                  <button onClick={onSetEnd} className="btn btn-primary btn-sm w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2">
                    <FaDirections /> Tuju ke sini
                  </button>
                ) : (
                  <div className="text-center text-muted small fst-italic py-1">Titik awal terpilih</div>
                )}

                <button onClick={onReset} className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2">
                  <FaTimesCircle /> Batal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;