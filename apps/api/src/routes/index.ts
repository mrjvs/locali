import { version } from '@/config';
import { handler } from '@/utils/handle';
import { makeRouter } from '@/utils/routes';

export const indexRouter = makeRouter((app) => {
  app.get(
    '',
    handler(async () => {
      return {
        message: 'API server is working!',
        version,
      };
    }),
  );
});
