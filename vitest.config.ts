import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'], // Relatórios gerados
      reportsDirectory: './coverage', // Pasta onde os relatórios serão salvos
      exclude: ['node_modules/', 'test/', 'dist/', '*.config.*'], // Exclui arquivos não relevantes
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
});
