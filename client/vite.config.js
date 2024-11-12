import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@react-three/drei': path.resolve('node_modules/@react-three/drei'),
    },
  },
  ssr: {
    noExternal: ['@react-three/drei'],
  },
});
