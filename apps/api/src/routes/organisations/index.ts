import { z } from 'zod';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { orgRoles } from '@/utils/perms/roles';
import { mapOrganisation } from '@/mappings/organisation';
import { NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';

export const organisationRouter = makeRouter((app) => {
  app.post(
    '/api/v1/organisations',
    {
      schema: {
        description: 'Create organisation',
        body: z.object({
          name: z.string().min(1),
        }),
      },
    },
    handler(async ({ body, auth }) => {
      auth.check((c) => c.hasPerm('CREATE:/organisation'));
      const newOrg = await prisma.organisation.create({
        data: {
          id: getId('org'),
          name: body.name,
          members: {
            create: {
              id: getId('orgmbr'),
              roles: [orgRoles.admin],
              userId: auth.data.getUserId(),
            },
          },
        },
      });
      return mapOrganisation(newOrg);
    }),
  );

  app.delete(
    '/api/v1/organisations/:id',
    {
      schema: {
        description: 'Delete organisation',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      auth.check((c) =>
        c.hasPerm('DELETE:/organisation/{org}', { org: params.id }),
      );

      const oldOrgs = await prisma.organisation.deleteMany({
        where: {
          id: params.id,
        },
      });
      if (oldOrgs.count === 0) throw new NotFoundError();
      return {
        id: params.id,
      };
    }),
  );

  app.get(
    '/api/v1/organisations/:id',
    {
      schema: {
        description: 'Get organisation',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params }) => {
      const org = await prisma.organisation.findUnique({
        where: {
          id: params.id,
        },
      });
      if (!org) throw new NotFoundError();
      return mapOrganisation(org);
    }),
  );

  app.get(
    '/api/v1/organisations',
    {
      schema: {
        description: 'List organisations',
        querystring: pagerSchema(),
      },
    },
    handler(async ({ query, auth }) => {
      auth.check((c) => c.hasPerm('LIST:/organisation'));

      const totalOrgs = await prisma.organisation.count();
      const orgs = await prisma.organisation.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return mapPage(query, orgs.map(mapOrganisation), totalOrgs);
    }),
  );
});
