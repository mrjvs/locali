import {
  setupFastify,
  setupFastifyRoutes,
  startFastify,
} from '@/modules/fastify';
import { logger } from './modules/log';
import { setupMailer } from './modules/emails';

const log = logger.child({ svc: 'lcl' });

log.info(`App booting...`);

const app = await setupFastify();
await setupFastifyRoutes(app);
setupMailer();
await startFastify(app);

log.info(`App setup, ready to accept connections`);
log.info(`--------------------------------------`);
