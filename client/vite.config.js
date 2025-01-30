import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api' : {
        target: 'https://aiimagica-backend.vercel.app',  // Your backend URL
        changeOrigin: true,  // Ensures the host header is modified for the target domain
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [react(), tailwindcss()],
})
