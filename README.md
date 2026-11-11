# 🗺️ Peta Interaktif Kampus Politeknik Negeri Lampung (POLINELA)

Aplikasi Web Sistem Informasi Geografis (SIG) interaktif berbasis **React**, **Vite**, dan **Mapbox GL** untuk navigasi denah kampus Politeknik Negeri Lampung, pencarian lokasi fasilitas/gedung, informasi penggunaan lahan, dan penentuan rute navigasi terpendek.

---

## ✨ Fitur Utama

- **Peta Interaktif Kampus**:
  - Visualisasi batas kawasan kampus Polinela dengan masking area sekitar.
  - Visualisasi 3D/2D bangunan gedung dan area lahan perkebunan/fasilitas.
  - Layer jaringan jalan kampus (visual aspal & jalur navigasi).
- **Pencarian Fasilitas & Gedung**:
  - Filter pencarian cepat untuk nama gedung, fasilitas, dan area lahan.
  - Fitur *fly-to* otomatis ke lokasi yang dipilih pada peta.
- **Navigasi & Pencarian Rute Terpendek**:
  - Penentuan rute dari titik awal (lokasi asal) ke gedung tujuan.
  - Menghitung jalur optimal secara otomatis menggunakan `geojson-path-finder` dan Turf.js berdasarkan jaringan jalur jalan kampus.
- **Detail Informasi & Galeri Foto**:
  - Sidebar informatif yang menampilkan deskripsi fasilitas, daftar ruangan, kategori, serta foto dokumentasi gedung/lahan.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Peta & GIS**: [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/), [Turf.js](https://turfjs.org/), [geojson-path-finder](https://github.com/perliedman/geojson-path-finder)
- **UI & Styling**: [Bootstrap 5](https://getbootstrap.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/<USERNAME>/peta-kampus.git
cd peta-kampus
\`\`\`

### 2. Install Dependensi
\`\`\`bash
npm install
\`\`\`

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
\`\`\`bash
cp .env.example .env
\`\`\`
Lalu buka file `.env` dan masukkan Mapbox Access Token Anda:
\`\`\`env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ5b3VyLXRva2VuIn0...
\`\`\`
*(Anda bisa mendapatkan token gratis di [Mapbox Console](https://account.mapbox.com/))*

### 4. Jalankan Server Development
\`\`\`bash
npm run dev
\`\`\`
Buka browser di URL lokal yang ditampilkan (biasanya `http://localhost:5173`).

### 5. Build Produksi
Untuk mengompilasi kode menjadi file statis siap rilis:
\`\`\`bash
npm run build
\`\`\`

---

## 📂 Struktur Direktori Proyek

\`\`\`text
peta-kampus/
├── public/
│   ├── data/                 # Data spasial GeoJSON (gedung, lahan, jalan, line navigasi)
│   ├── img/                  # Foto gedung, lahan, dan logo institusi
│   └── ...
├── src/
│   ├── components/           # Komponen UI (Map, Navbar, Sidebar, Search, LoadingScreen)
│   ├── pages/                # Halaman aplikasi (LandingPage, MapPage, AboutPage)
│   ├── App.jsx               # Konfigurasi routing utama
│   ├── main.jsx              # Entry point aplikasi React
│   └── index.css             # Styling global
├── .env.example              # Template variabel lingkungan
├── package.json
└── vite.config.js
\`\`\`

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan navigasi dan informasi civitas akademika Politeknik Negeri Lampung.
