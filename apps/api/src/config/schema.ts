import { zodCoercedBoolean } from '@neato/config';
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
  mailer: z
    .discriminatedUnion('enabled', [
      z.object({
        enabled: z.literal('false'),
      }),
      z.object({
        enabled: z.literal('true'),
        smtpHost: z.string().min(1),
        smtpPort: z.coerce.number().positive(),
        secure: zodCoercedBoolean().default(false),
        smtpUser: z.string().min(1).optional(),
        smtpPassword: z.string().min(1).optional(),
        from: z.string().min(1).optional(),
      }),
    ])
    .default({ enabled: 'false' }),
});
