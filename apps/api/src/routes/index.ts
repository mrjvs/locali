import { version } from '@/config';
import { handle } from '@/utils/handle';
import { makeRouter } from '@/utils/routes';

export const indexRouter = makeRouter((app) => {
  app.get(
    '/',
    handle(async () => {
      return {
        message: 'API server is working!',
        version,
      };
    }),
  );
});
