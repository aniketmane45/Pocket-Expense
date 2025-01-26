import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows external access
    port: 5174,        // Keep your port or change to another one if needed
  }
})
