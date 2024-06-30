import { z } from 'zod';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';
import { mapProjectMember } from '@/mappings/projectmember';

export const projectMemberRouter = makeRouter((app) => {
  app.post(
    '/api/v1/projects/:proj/members',
    {
      schema: {
        description: 'Add project member',
        params: z.object({
          proj: z.string(),
        }),
        body: z.object({
          userId: z.string().min(1),
        }),
      },
    },
    handler(async ({ body, auth, params }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: params.proj,
        },
      });
      if (!project) throw new NotFoundError();
      auth.check((c) =>
        c.hasPerm('CREATE:/organisation/{org}/project/{proj}/member', {
          org: project.orgId,
          proj: project.id,
        }),
      );
      const newMember = await prisma.projectMember.create({
        data: {
          id: getId('prjmbr'),
          projectId: project.id,
          userId: body.userId,
        },
        include: {
          user: true,
        },
      });
      return mapProjectMember(newMember);
    }),
  );

  app.delete(
    '/api/v1/projects/:proj/members/:id',
    {
      schema: {
        description: 'Delete project member',
        params: z.object({
          proj: z.string(),
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: params.proj,
        },
      });
      if (!project) throw new NotFoundError();
      auth.check((c) =>
        c.hasPerm('DELETE:/organisation/{org}/project/{proj}/member/{id}', {
          org: project.orgId,
          proj: project.id,
          id: params.id,
        }),
      );

      const oldMembers = await prisma.projectMember.deleteMany({
        where: {
          projectId: project.id,
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
    '/api/v1/projects/:proj/members/:id',
    {
      schema: {
        description: 'Get project member',
        params: z.object({
          proj: z.string(),
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      const member = await prisma.projectMember.findUnique({
        where: {
          projectId: params.proj,
          id: params.id,
        },
        include: {
          user: true,
          project: true,
        },
      });
      if (!member) throw new NotFoundError();
      auth.check((c) =>
        c.hasPerm('READ:/organisation/{org}/project/{proj}/member/{id}', {
          org: member.project.orgId,
          proj: member.projectId,
          id: params.id,
        }),
      );
      return mapProjectMember(member);
    }),
  );

  app.get(
    '/api/v1/projects/:proj/members',
    {
      schema: {
        description: 'List project members',
        params: z.object({
          proj: z.string(),
        }),
        querystring: pagerSchema(),
      },
    },
    handler(async ({ params, auth, query }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: params.proj,
        },
      });
      if (!project) throw new NotFoundError();
      auth.check((c) =>
        c.hasPerm('LIST:/organisation/{org}/project/{proj}/member', {
          org: project.orgId,
          proj: project.id,
        }),
      );

      const totalMembers = await prisma.projectMember.count();
      const members = await prisma.projectMember.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          projectId: project.id,
        },
        include: {
          user: true,
        },
      });
      return mapPage(query, members.map(mapProjectMember), totalMembers);
    }),
  );
});
