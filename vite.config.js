import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// `fallback_image_url` 모듈과 파일 경로를 올바르게 지정해야 합니다.
// import { fallback_image_url } from './path/to/fallback_image_url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'fallback_image_url': './path/to/fallback_image_url',
    }
  },
  build: {
    rollupOptions: {
      external: ['fallback_image_url'],
    },
  },
});