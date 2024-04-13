import { createConfigLoader } from 'neat-config';
import { configSchema } from '@/config/schema';

export const version = process.env.npm_package_version ?? 'unknown';

export const conf = createConfigLoader()
  .addFromEnvironment('LCL_')
  .addFromCLI('lcl-')
  .addFromFile('.env', {
    prefix: 'LCL_',
  })
  .addFromFile('config.json')
  .addZodSchema(configSchema)
  .load();
