import { z } from 'zod';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { ApiError, apiErrorCodes, NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';
import { mapOrgMember } from '@/mappings/orgmember';
import { orgRoles } from '@/utils/perms/roles';
import { generateSecureKey } from '@/utils/auth/pass';
import { inviteEmail } from '@/modules/emails/templates/invite';

export const organisationMemberRouter = makeRouter((app) => {
  app.post(
    '/api/v1/organisations/:org/members/invite',
    {
      schema: {
        description: 'Invite organisation member',
        params: z.object({
          org: z.string(),
        }),
        body: z.object({
          email: z.string().email().optional(),
          userId: z.string().min(1).optional(),
          roles: z.array(z.nativeEnum(orgRoles)).default([]),
        }),
      },
    },
    handler(async ({ body, auth, params }) => {
      auth.check((c) =>
        c.hasPerm('CREATE:/organisation/{org}/member', { org: params.org }),
      );

      let email = body.email;
      if (body.userId) {
        const user = await prisma.user.findUnique({
          where: {
            id: body.userId,
          },
        });
        email = user?.email;
      }

      if (!email) throw new ApiError(apiErrorCodes.invalid, 'invalid', 400);

      const newInvite = await prisma.orgInviteCode.create({
        data: {
          id: getId('orginv'),
          orgId: params.org,
          code: generateSecureKey(),
          email,
          roles: body.roles,
        },
        include: {
          org: true,
        },
      });

      await inviteEmail.send({
        props: {
          inviteLink: 'test',
          orgName: newInvite.org.name,
          type: 'org',
        },
        to: newInvite.email,
      });

      return { success: true };
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
        where: {
          orgId: params.org,
        },
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
