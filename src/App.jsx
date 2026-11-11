// src/App.jsx

import React from 'react'; // Hapus useState
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import MapPage from './pages/MapPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

// Hapus impor Navbar dan Search dari sini

function App() {
  // Hapus state mapStyle dan searchTerm dari sini

  return (
    // Hapus div wrapper, biarkan Routes menjadi elemen teratas
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* MapPage sekarang akan mengelola state-nya sendiri */}
        <Route path="/peta" element={<MapPage />} />
        <Route path="/tentang" element={<AboutPage />} />
      </Routes>
  );
}

export default App;