import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'seeder',
  entry: ['src/modules/prisma/seed.ts'],
  format: 'esm',
});
