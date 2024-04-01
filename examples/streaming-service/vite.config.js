import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import path from 'node:path';
const __dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint({ exclude: ['**/node_modules/**', '**/dist/**', '**/*.min.*'] })],
  build: {
    minify: false,
    manifest: true,
    emptyOutDir: false,
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.js'),
    },
  },
});
