import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.codeleap.co.uk',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/careers'),
      },
    },
  },
});
