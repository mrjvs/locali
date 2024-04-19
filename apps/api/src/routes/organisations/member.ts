import { z } from 'zod';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';
import { mapOrgMember } from '@/mappings/orgmember';

export const organisationMemberRouter = makeRouter((app) => {
  app.post(
    '/api/v1/organisations/:org/members',
    {
      schema: {
        description: 'Add organisation member',
        params: z.object({
          org: z.string(),
        }),
        body: z.object({
          userId: z.string().min(1),
        }),
      },
    },
    handler(async ({ body, auth, params }) => {
      auth.check((c) =>
        c.hasPerm('CREATE:/organisation/{org}/member', { org: params.org }),
      );
      const newMember = await prisma.orgMember.create({
        data: {
          id: getId('orgmbr'),
          orgId: params.org,
          userId: body.userId,
        },
        include: {
          user: true,
        },
      });
      return mapOrgMember(newMember);
    }),
  );

  app.delete(
    '/api/v1/organisations/:org/members/:id',
    {
      schema: {
        description: 'Delete organisation member',
        params: z.object({
          org: z.string(),
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      auth.check((c) =>
        c.hasPerm('DELETE:/organisation/{org}/member/{id}', {
          org: params.org,
          id: params.id,
        }),
      );

      const oldMembers = await prisma.orgMember.deleteMany({
        where: {
          orgId: params.org,
          id: params.id,
        },
      });
      if (oldMembers.count === 0) throw new NotFoundError();
      return {
        id: params.id,
      };
    }),
  );

  app.get(
    '/api/v1/organisations/:org/members/:id',
    {
      schema: {
        description: 'Get organisation member',
        params: z.object({
          org: z.string(),
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      auth.check((c) =>
        c.hasPerm('READ:/organisation/{org}/member/{id}', {
          org: params.org,
          id: params.id,
        }),
      );
      const member = await prisma.orgMember.findUnique({
        where: {
          orgId: params.org,
          id: params.id,
        },
        include: {
          user: true,
        },
      });
      if (!member) throw new NotFoundError();
      return mapOrgMember(member);
    }),
  );

  app.get(
    '/api/v1/organisations/:org/members',
    {
      schema: {
        description: 'List organisation members',
        params: z.object({
          org: z.string(),
        }),
        querystring: pagerSchema(),
      },
    },
    handler(async ({ params, auth, query }) => {
      auth.check((c) =>
        c.hasPerm('LIST:/organisation/{org}/member', { org: params.org }),
      );

      const totalMembers = await prisma.orgMember.count();
      const members = await prisma.orgMember.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      });
      return mapPage(query, members.map(mapOrgMember), totalMembers);
    }),
  );
});
