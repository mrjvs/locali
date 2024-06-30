import { z } from 'zod';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { makeRouter } from '@/utils/routes';
import { verifyPassword } from '@/utils/auth/pass';
import { ApiError, NotFoundError } from '@/utils/error';
import { createSession, makeSessionToken } from '@/utils/auth/session';
import { mapExpandedUser } from '@/mappings/user';
import { timeout } from '@/utils/timeout';

export const authRouter = makeRouter((app) => {
  app.post(
    '/api/v1/auth/login',
    {
      schema: {
        description: 'Login user',
        body: z.object({
          email: z.string().min(1),
          password: z.string().min(1),
        }),
      },
    },
    handler(async ({ body }) => {
      // wait a few seconds on error, to prevent timing attacks
      const timeoutPromise = timeout(2000);

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
        include: {
          orgMembers: {
            include: {
              org: true,
            },
          },
          projectMembers: {
            include: {
              project: true,
            },
          },
        },
      });
      if (!user) {
        await timeoutPromise;
        throw ApiError.forCode('authInvalidInput', 400);
      }
      if (!(await verifyPassword(user.passwordHash, body.password))) {
        await timeoutPromise;
        throw ApiError.forCode('authInvalidInput', 400);
      }

      const session = await createSession(user);
      return {
        user: mapExpandedUser(user),
        token: makeSessionToken(session.id),
      };
    }),
  );

  app.post(
    '/api/v1/auth/logout',
    {
      schema: {
        description: 'Logout user',
      },
    },
    handler(async ({ auth }) => {
      auth.check((c) => c.isAuthType('session'));
      const id = auth.data.getSession().id;

      const oldSessions = await prisma.userSession.deleteMany({
        where: {
          id,
        },
      });
      if (oldSessions.count === 0) throw new NotFoundError();
      return {
        id,
      };
    }),
  );
});
