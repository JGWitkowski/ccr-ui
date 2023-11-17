// import react from '@vitejs/plugin-react-swc'
// import { defineConfig } from 'vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     sourcemap: true,
//   },
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 3000,
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/ccr-ui',
// })

export default defineConfig({
  // build: {
  //   sourcemap: true,
  // },
  plugins: [react()],
  base: '/ccr-ui',
  // server: {
  //   host: true,
  //   port: 3000,
  // },
})
