import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // S'assure que le chemin de base est correct
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Redirige les routes vers index.html
  },
})
