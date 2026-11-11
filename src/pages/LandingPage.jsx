// src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Hapus FaMapMarkedAlt karena diganti gambar

function LandingPage() {
  return (
    // Background dengan gradasi Biru Polinela
    <div className="vh-100 d-flex flex-column overflow-auto" style={{background: 'linear-gradient(135deg, #1b5eaa 0%, #0d3d73 100%)'}}>
      
      {/* Hero Section */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative overflow-hidden">
        
        {/* Dekorasi Latar Belakang (Lingkaran Transparan) */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
            <div className="position-absolute top-0 end-0 bg-warning opacity-25 rounded-circle" style={{width: '500px', height: '500px', filter: 'blur(100px)', transform: 'translate(30%, -30%)'}}></div>
            <div className="position-absolute bottom-0 start-0 bg-info opacity-25 rounded-circle" style={{width: '400px', height: '400px', filter: 'blur(80px)', transform: 'translate(-30%, 30%)'}}></div>
        </div>

        <div className="container position-relative z-1 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              
              {/* --- BAGIAN YANG DIUBAH: LOGO POLINELA --- */}
              <div className="mb-4 d-inline-block p-3 rounded-circle bg-white bg-opacity-10 shadow-sm backdrop-blur">
                <img 
                  src="/img/logo.png" 
                  alt="Logo Polinela" 
                  style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
                />
              </div>
              {/* ----------------------------------------- */}
              
              {/* Judul */}
              <h1 className="display-5 fw-bold text-white mb-3 ls-tight">
                Peta Digital 
                <br /><span className="text-warning">Politeknik Negeri Lampung</span>
              </h1>
              
              {/* Deskripsi */}
              <p className="lead text-white-50 mb-4 px-lg-5 fs-6">
                Jelajahi fasilitas kampus dengan mudah. Temukan lokasi gedung, lahan praktik, dan rute terbaik dalam satu aplikasi interaktif.
              </p>

              {/* Tombol */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/peta" className="btn btn-warning text-dark fw-bold px-4 py-2 rounded-pill shadow-lg hover-scale d-flex align-items-center justify-content-center gap-2 transition-all">
                  Mulai Eksplorasi <FaArrowRight size={14} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-3 text-center text-white-50 small border-top border-white border-opacity-10">
        <div className="container">
          &copy; {new Date().getFullYear()} Politeknik Negeri Lampung. All rights reserved.
        </div>
      </footer>

      {/* CSS Inline */}
      <style>
        {`
          .hover-scale:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important; }
          .transition-all { transition: all 0.3s ease; }
          .backdrop-blur { backdrop-filter: blur(5px); }
        `}
      </style>
    </div>
  );
}

export default LandingPage;