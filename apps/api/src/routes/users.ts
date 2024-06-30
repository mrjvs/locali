import { z } from 'zod';
import type { AuthContext } from '@/utils/auth/context';
import { mapExpandedUser, mapUser } from '@/mappings/user';
import { createSession, makeSessionToken } from '@/utils/auth/session';
import { hashPassword } from '@/utils/auth/pass';
import { prisma } from '@/modules/prisma';
import { NotFoundError } from '@/utils/error';
import { handler } from '@/utils/handle';
import { mapPage, pagerSchema } from '@/utils/pages';
import { makeRouter } from '@/utils/routes';
import { getId } from '@/utils/get-id';
import { passwordSchema } from '@/utils/zod';

function getAtMe(auth: AuthContext, id: string) {
  if (id === '@me') return auth.data.getUserIdOrDefault() ?? id;
  return id;
}

export const usersRouter = makeRouter((app) => {
  app.post(
    '/api/v1/users',
    {
      schema: {
        description: 'Create user',
        body: z.object({
          email: z.string().min(1),
          password: passwordSchema(),
        }),
      },
    },
    handler(async ({ body, auth }) => {
      auth.check((c) => c.hasPerm('CREATE:/user'));
      const newUser = await prisma.user.create({
        data: {
          id: getId('usr'),
          email: body.email,
          passwordHash: await hashPassword(body.password),
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
      const session = await createSession(newUser);
      return {
        user: mapExpandedUser(newUser),
        token: makeSessionToken(session.id),
      };
    }),
  );

  app.delete(
    '/api/v1/users/:id',
    {
      schema: {
        description: 'Delete user',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      auth.check(
        (c) =>
          c.isUser(params.id) ||
          c.hasPerm('DELETE:/user/{id}', { id: params.id }),
      );

      const oldUsers = await prisma.user.deleteMany({
        where: {
          id: params.id,
        },
      });
      if (oldUsers.count === 0) throw new NotFoundError();
      return {
        id: params.id,
      };
    }),
  );

  app.get(
    '/api/v1/users/:id',
    {
      schema: {
        description: 'Get user',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      const id = getAtMe(auth, params.id);
      auth.check((c) => c.isUser(id) || c.hasPerm('READ:/user/{id}', { id }));
      const isSelf = auth.checkers.isUser(id);
      const user = await prisma.user.findUnique({
        where: {
          id,
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
      if (!user) throw new NotFoundError();
      return isSelf ? mapExpandedUser(user) : mapUser(user);
    }),
  );

  app.get(
    '/api/v1/users',
    {
      schema: {
        description: 'List users',
        querystring: pagerSchema(),
      },
    },
    handler(async ({ query, auth }) => {
      auth.check((c) => c.hasPerm('LIST:/user'));

      const totalUsers = await prisma.user.count();
      const users = await prisma.user.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return mapPage(query, users.map(mapUser), totalUsers);
    }),
  );
});
