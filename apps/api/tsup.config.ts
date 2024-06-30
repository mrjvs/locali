import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'locali',
  entry: ['src/main.ts'],
  format: 'esm',
});
