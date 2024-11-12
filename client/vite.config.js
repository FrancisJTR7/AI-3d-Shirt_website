import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  alias: {
    '@react-three/drei': '@react-three/drei/dist/index.cjs.js',
  },
});
