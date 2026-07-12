import { resolve } from 'node:path';
import { copyFile, mkdir } from 'node:fs/promises';
import { defineConfig } from 'vite';

const root = process.cwd();

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        'aviso-legal': resolve(root, 'aviso-legal.html'),
        'politica-privacidad': resolve(root, 'politica-privacidad.html'),
        'politica-cookies': resolve(root, 'politica-cookies.html')
      }
    }
  },
  plugins: [{
    name: 'copy-static-host-files',
    async closeBundle() {
      await mkdir(resolve(root, 'dist'), { recursive: true });
      await Promise.all(['robots.txt', '_headers'].map((file) => copyFile(resolve(root, file), resolve(root, 'dist', file))));
    }
  }]
});
