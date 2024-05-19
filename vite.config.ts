import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'index.js',
        assetFileNames: assetInfo => {
          if (assetInfo.name!.endsWith('.css')) {
            return 'index.css'
          }
          return assetInfo.name!
        },
      },
    },
  },
})
