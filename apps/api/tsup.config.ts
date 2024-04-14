import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'guider-client',
  entry: ['src/main.ts', 'src/modules/prisma/seed.ts'],
  format: 'esm',
});
