import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
const pathSrc = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin(),
    react()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${pathSrc}/_variables";`,
      },
    },
  },
});
