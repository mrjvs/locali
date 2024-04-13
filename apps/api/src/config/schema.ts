import { zodCoercedBoolean } from 'neat-config';
import { z } from 'zod';

export const configSchema = z.object({
  server: z
    .object({
      port: z.coerce.number().default(8080),
      cors: z.string().default(''),
      basePath: z.string().default('/'),
    })
    .default({}),
  logging: z
    .object({
      format: z.enum(['json', 'pretty']).default('pretty'),
      debug: zodCoercedBoolean().default(false),
    })
    .default({}),
  db: z.object({
    connection: z.string(),
    ssl: zodCoercedBoolean().default(false),
  }),
  crypto: z.object({
    secret: z.string().min(32),
  }),
});
