import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // INFO: Allow linked packages `../..`.
      strict: false,
    },
  },
})
