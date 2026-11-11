// src/pages/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaMapMarkedAlt, FaRoute, FaSearch, FaCode, 
  FaUserGraduate, FaHeart, FaArrowRight, FaQuestionCircle, FaEnvelope
} from 'react-icons/fa';

function AboutPage() {
  const [dummyStyle, setDummyStyle] = React.useState('');

  return (
    <div className="d-flex flex-column vh-100 bg-light overflow-auto">
      <Navbar currentStyle={dummyStyle} setMapStyle={setDummyStyle} />

      {/* WRAPPER UTAMA */}
      <br /><br />
      <div className="container py-4 py-md-5 flex-grow-1">
        
        {/* SECTION 1: HERO & INTRO */}
        <div className="row justify-content-center mb-5 fade-in-up">
          <div className="col-lg-8 text-center">
            <div className="d-inline-block p-3 rounded-circle bg-white shadow-sm mb-4">
               <img src="/img/logo.png" alt="Polinela" style={{width: '70px', height: 'auto'}} />
            </div>
            <h1 className="fw-bold text-dark mb-3 display-6">Mengenal Peta Digital Polinela</h1>
            <p className="lead text-secondary mb-4 fs-6 fs-md-5">
              Solusi cerdas untuk navigasi dan eksplorasi lingkungan kampus <strong>Politeknik Negeri Lampung</strong>. 
              Dirancang untuk membantu mahasiswa, dosen, dan tamu menemukan lokasi dengan cepat dan akurat.
            </p>
            <Link to="/peta" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm hover-scale">
              Buka Peta Sekarang <FaArrowRight className="ms-2" size={12}/>
            </Link>
          </div>
        </div>

        {/* SECTION 2: PANDUAN PENGGUNAAN (BARU - Agar lebih informatif) */}
        <div className="mb-5 fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="d-flex align-items-center gap-2 mb-4 justify-content-center justify-content-md-start">
             <FaQuestionCircle className="text-primary" size={24} />
             <h4 className="fw-bold m-0">Panduan Singkat</h4>
          </div>

          <div className="row g-3 g-md-4">
            {/* Step 1 */}
            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100 border-start border-4 border-primary">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', flexShrink: 0}}>1</div>
                  <h6 className="fw-bold m-0">Cari Lokasi</h6>
                </div>
                <p className="text-secondary small m-0">
                  Gunakan kolom pencarian di bagian atas peta. Ketik nama gedung (contoh: "Gedung Sakipa") atau fasilitas (contoh: "Masjid").
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100 border-start border-4 border-warning">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', flexShrink: 0}}>2</div>
                  <h6 className="fw-bold m-0">Lihat Detail</h6>
                </div>
                <p className="text-secondary small m-0">
                  Klik pada area gedung di peta atau hasil pencarian untuk melihat foto, deskripsi, dan informasi detail gedung tersebut.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100 border-start border-4 border-success">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', flexShrink: 0}}>3</div>
                  <h6 className="fw-bold m-0">Navigasi</h6>
                </div>
                <p className="text-secondary small m-0">
                  Klik tombol <strong>"Mulai dari sini"</strong> pada titik awal, lalu klik <strong>"Tuju ke sini"</strong> pada gedung tujuan untuk menampilkan rute jalan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: TECH & DEVELOPER (Responsive Adjustments) */}
        <div className="row justify-content-center fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="col-lg-12">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                

                {/* Kolom Kanan: Pengembang (Light Mode) */}
                <div className="col-12 bg-white p-4 p-md-5">
                  <h4 className="fw-bold mb-4 d-flex align-items-center gap-2 text-primary">
                     Sejarah Politeknik Negeri Lampung
                  </h4>
                  
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-4">
                    {/* FOTO PROFIL (Placeholder) */}
                    
                    <div>
                      <p className="text-secondary small mb-0 text-justify">
                        Politeknik Negeri Lampung (Polinela) merupakan pendidikan tinggi penyelenggara program vokasi yang berdasarkan Pancasila dan Undang-undang 1945 dengan mengemban fungsi membentuk watak dan peradaban yang bermartabat dalam rangka mencerdaskan kehidupan bangsa.
                        <br /><br />
                        Politeknik Pertanian Negeri di Propinsi Lampung ini resmi terbentuk dengan diterbitkannya SK. Dirjen Dikti Depdikbud No.14/Dikti/Kep/1984, tanggal 7 April 1984 tentang Pembentukan Politeknik Pertanian Universitas Lampung. Kemudian dalam rangka mempersiapkan pengembangan Politeknik Pertanian, yang meliputi pengembangan fisik kampus, tenaga pengajar, dan pengembangan kurikulum, maka pada tanggal 3 Desember 1985, melalui SK. Dirjen Dikti Depdikbud No.79/Dikti/Kep/1985, dibentuk Penanggung Jawab Unit Pelaksana Proyek pada Proyek Pengembangan Pendidikan Politeknik Pertanian Universitas Lampung.
                        <br /><br />
                        Pada tanggal 3 Nopember 1988 Politeknik Pertanian Universitas Lampung menempati kampus baru di Jalan Soekarno-Hatta, Rajabasa, Bandar Lampung, dan pada tanggal 15 Desember 1988 Penanggungjawab Pengembangan Politeknik Pertanian Negeri Lampung dilantik oleh Rektor Universitas Lampung. Pada tanggal 7 April 2001, berdasarkan SK. Mendiknas RI No. 036/O/2001 tentang Pendirian Politeknik Pertanian Negeri Bandar Lampung, Politeknik Pertanian Negeri Lampung resmi mandiri menjadi salah satu bentuk Perguruan Tinggi Negeri (PTN) di Propinsi Lampung dengan nama Politeknik Pertanian Negeri Bandar Lampung.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-muted small bg-white border-top mt-auto">
        <div className="container">
          <p className="mb-1">&copy; {new Date().getFullYear()} Politeknik Negeri Lampung</p>
          <p className="mb-0 text-secondary opacity-75">Jl. Soekarno Hatta No.10, Rajabasa Raya, Bandar Lampung</p>
        </div>
      </footer>
      
      {/* Animation Styles */}
      <style>{`
        .hover-scale:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; transition: all 0.3s ease; }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .text-justify {
        text-align: justify;
        text-justify: inter-word;
        }
      `}</style>
    </div>
  );
}

export default AboutPage;