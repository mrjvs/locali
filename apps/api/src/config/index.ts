import { createConfigLoader } from '@neato/config';
import { configSchema } from '@/config/schema';
import { fragments } from './fragments';

export const version = process.env.npm_package_version ?? 'unknown';

export const conf = createConfigLoader()
  .addFromEnvironment('LCL_')
  .addFromCLI('lcl-')
  .addFromFile('.env', {
    prefix: 'LCL_',
  })
  .addFromFile('config.json')
  .addConfigFragments(fragments)
  .setFragmentKey('USE_PRESETS')
  .addZodSchema(configSchema)
  .load();
