import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ccr-ui/',
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
})
