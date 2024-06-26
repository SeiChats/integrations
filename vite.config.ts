import { defineConfig } from 'vite'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      crypto: 'crypto-browserify',
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Specify the entry file name pattern
        entryFileNames: 'index.js',
        // Specify the chunk file name pattern (set to same name to ensure single file)
        chunkFileNames: 'index.js',
        // Specify the asset file name pattern
        assetFileNames: assetInfo => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'index.css'
          }
          return assetInfo.name!
        },
        // Disable code splitting
        manualChunks: () => 'index.js',
      },
    },
    // Ensure inline dynamic imports are not split into separate files
    commonjsOptions: {
      include: /node_modules/,
    },
    // Ensure minification settings are adjusted to prevent extra files
    // minify: 'terser', // You can adjust this based on your preference
    // terserOptions: {
    //   format: {
    //     comments: false,
    //   },
    // },
    // Set to false to prevent generating additional asset files
    assetsInlineLimit: 100 * 1024 * 1024,
  },
})
