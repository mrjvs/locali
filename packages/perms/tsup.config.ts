import { defineConfig } from 'tsup';

export default defineConfig({
  name: '@repo/perms',
  entry: ['src/main.ts'],
  format: 'esm',
  dts: true,
});
