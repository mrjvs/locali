import { PrismaClient } from '@prisma/client';
import { conf } from '@/config';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: conf.db.connection,
    },
  },
});
