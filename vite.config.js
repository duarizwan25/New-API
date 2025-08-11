import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/guardian': {
        target: 'https://content.guardianapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/guardian/, '')
      }
    }
  }
})
