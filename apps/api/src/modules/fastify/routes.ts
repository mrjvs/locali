import { type FastifyInstance } from 'fastify';
import { indexRouter } from '@/routes';
import { usersRouter } from '@/routes/users';
import { authRouter } from '@/routes/auth';
import { organisationRouter } from '@/routes/organisations';
import { projectRouter } from '@/routes/projects';

export async function setupRoutes(app: FastifyInstance) {
  await app.register(indexRouter.register);
  await app.register(usersRouter.register);
  await app.register(authRouter.register);
  await app.register(organisationRouter.register);
  await app.register(projectRouter.register);
}
