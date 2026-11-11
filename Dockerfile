# ==========================================
# Stage 1: Build Frontend (Vite + React)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Salin file dependensi
COPY package*.json ./

# Install dependensi proyek
RUN npm ci

# Salin seluruh kode sumber proyek
COPY . .

# Argument untuk token Mapbox (di-inject saat proses build Vite)
ARG VITE_MAPBOX_TOKEN
ENV VITE_MAPBOX_TOKEN=$VITE_MAPBOX_TOKEN

# Kompilasi aplikasi ke folder /app/dist
RUN npm run build

# ==========================================
# Stage 2: Serve dengan Nginx Web Server
# ==========================================
FROM nginx:alpine AS runner

# Salin custom konfigurasi Nginx untuk routing SPA React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin hasil build dari stage builder ke root direktori web Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port HTTP
EXPOSE 80

# Jalankan Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]

