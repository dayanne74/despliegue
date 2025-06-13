import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["mui-datatables"]
    }
  },
  server: {
    proxy: {
      // Proxy para llamadas API
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Proxy para imágenes estáticas
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Puedes agregar configuración MIME aquí, pero fuera del bloque `server`
  mimeTypes: {
    'application/javascript': ['.js', '.jsx'],
  },
});
