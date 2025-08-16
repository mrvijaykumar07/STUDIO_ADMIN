import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://studio-crm-management-backend-370155981157.asia-south1.run.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
