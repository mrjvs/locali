import type { z } from 'zod';
import type { PartialDeep } from 'type-fest';
import type { configSchema } from './schema';

type Fragment = PartialDeep<z.infer<typeof configSchema>>;

export const fragments: Record<string, Fragment> = {
  docker: {
    server: {
      cors: 'http://localhost:3000',
    },
    db: {
      connection: 'postgres://postgres:postgres@postgres:5432/postgres',
    },
    crypto: {
      secret: '12345678901234567890123456789012',
    },
    mailer: {
      enabled: 'true',
      smtpHost: 'localhost',
      smtpPort: 1025,
      secure: false,
    },
  },
};
