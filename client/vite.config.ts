import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'

// If you need path aliases, use ESM import:
// import path from 'node:path'

export default defineConfig({
    plugins: [react()],
    // server: { host: true, port: 3000 },
    build: { outDir: 'dist' }
    // resolve: {
    //   alias: { '@': path.resolve(__dirname, 'src') }
    // }
})
