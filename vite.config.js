import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 🔥 Ajout essentiel pour Netlify
  plugins: [react()],
})
