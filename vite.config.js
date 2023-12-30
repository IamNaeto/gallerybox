import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  plugins: [env()],
})
