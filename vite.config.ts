import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        'service-asset-config': resolve(
          __dirname,
          'mockups/service-asset-config.html',
        ),
      },
    },
  },
});
