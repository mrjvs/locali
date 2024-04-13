import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'guider-client',
  entry: ['src/main.ts'],
  format: 'esm',
});
