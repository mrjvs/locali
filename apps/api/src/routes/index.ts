import { version } from '@/config';
import { isPrismaConnected } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { makeRouter } from '@/utils/routes';

interface Check {
  name: string;
  success: boolean;
}

async function healtcheck(): Promise<Check[]> {
  return [
    {
      name: 'prisma',
      success: await isPrismaConnected(),
    },
  ];
}

export const indexRouter = makeRouter((app) => {
  app.get(
    '',
    {
      schema: {
        description: 'Healthcheck',
      },
    },
    handler(async ({ res }) => {
      const checks = await healtcheck();
      const isHealthy = checks.every((v) => v.success);
      void res.status(isHealthy ? 200 : 500);
      return {
        message: 'API server is working!',
        version,
        checks,
      };
    }),
  );
});
