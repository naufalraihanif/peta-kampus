// src/components/Navbar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaLayerGroup, FaMap } from 'react-icons/fa';

function Navbar({ children, currentStyle, setMapStyle }) {
  const location = useLocation();
  const isMapPage = location.pathname === '/peta';
  const isSatellite = currentStyle && currentStyle.includes('satellite');

  const handleModeToggle = () => {
    setMapStyle(
      isSatellite
        ? 'mapbox://styles/mapbox/streets-v12'
        : 'mapbox://styles/mapbox/satellite-streets-v12'
    );
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark navbar-glass fixed-top shadow-sm px-3 px-md-4 py-1 z-3"
      style={{ minHeight: '60px' }}
    >
      <div className="container-fluid p-0">

        {/* BRAND */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 me-auto">
          <div
            className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '36px', height: '36px' }}
          >
            <img src="/img/logo.png" alt="Logo" style={{ height: '26px' }} />
          </div>
          <div className="d-flex flex-column justify-content-center">
          <span
            className="text-white fw-semibold"
            style={{
              fontSize: '0.95rem',
              letterSpacing: '0.5px'
            }}
          >
            PETA DIGITAL
          </span>
          <span
            className="text-white-50"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.8px'
            }}
          >
            Politeknik Negeri Lampung
          </span>
        </div>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENT */}
        <div className="collapse navbar-collapse mt-2 mt-md-0" id="navbarContent">

          {/* SEARCH (KHUSUS HALAMAN PETA) */}
          <div className="flex-grow-1 d-flex justify-content-center mx-md-4">
            {isMapPage && (
              <div className="w-100" style={{ maxWidth: '420px' }}>
                {children}
              </div>
            )}
          </div>

          {/* MENU */}
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <div className="d-flex gap-1 bg-white bg-opacity-10 p-1 rounded-pill">
              <Link
                to="/"
                className={`btn btn-sm rounded-pill px-3 text-white ${
                  location.pathname === '/' ? 'nav-btn-active' : ''
                }`}
              >
                <FaHome size={13} /> <span className="ms-1">Beranda</span>
              </Link>

              <Link
                to="/tentang"
                className={`btn btn-sm rounded-pill px-3 text-white ${
                  location.pathname === '/tentang' ? 'nav-btn-active' : ''
                }`}
              >
                <FaInfoCircle size={13} /> <span className="ms-1">Tentang</span>
              </Link>
            </div>

            {isMapPage && (
              <button
                onClick={handleModeToggle}
                className="btn btn-sm bg-warning text-dark fw-semibold rounded-pill px-3 shadow-sm"
              >
                {isSatellite ? <FaMap /> : <FaLayerGroup />}
                <span className="ms-2">
                  {isSatellite ? 'Mode Jalan' : 'Mode Satelit'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
