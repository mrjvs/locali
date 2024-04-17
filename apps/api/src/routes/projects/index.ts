import { z } from 'zod';
import { makeRouter } from '@/utils/routes';
import { prisma } from '@/modules/prisma';
import { handler } from '@/utils/handle';
import { getId } from '@/utils/get-id';
import { NotFoundError } from '@/utils/error';
import { mapPage, pagerSchema } from '@/utils/pages';
import { mapProject } from '@/mappings/project';

export const projectRouter = makeRouter((app) => {
  app.post(
    '/api/v1/organisations/:id/projects',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string().min(1),
        }),
      },
    },
    handler(async ({ body, auth, params }) => {
      auth.check((c) =>
        c.hasPerm('CREATE:/organisation/{org}/projects', { org: params.id }),
      );
      const newProject = await prisma.project.create({
        data: {
          id: getId('prj'),
          orgId: params.id,
          name: body.name,
        },
      });
      return mapProject(newProject);
    }),
  );

  app.delete(
    '/api/v1/projects/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: params.id,
        },
      });
      if (!project) throw new NotFoundError();
      auth.check((c) =>
        c.hasPerm('DELETE:/organisation/{org}/projects/{proj}', {
          org: project.orgId,
          proj: project.id,
        }),
      );

      await prisma.project.deleteMany({
        where: {
          id: project.id,
        },
      });
      return {
        id: project.id,
      };
    }),
  );

  app.get(
    '/api/v1/projects/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ params, auth }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: params.id,
        },
      });
      if (!project) throw new NotFoundError();
      auth.check((c) =>
        c.hasPerm('READ:/organisation/{org}/projects/{proj}', {
          org: project.orgId,
          proj: project.id,
        }),
      );
      return mapProject(project);
    }),
  );

  app.get(
    '/api/v1/organisations/:id/projects',
    {
      schema: {
        querystring: pagerSchema(),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    handler(async ({ query, auth, params }) => {
      auth.check((c) =>
        c.hasPerm('LIST:/organisation/{org}/projects', { org: params.id }),
      );

      const total = await prisma.project.count({
        where: {
          orgId: params.id,
        },
      });
      const projects = await prisma.project.findMany({
        take: query.limit,
        skip: query.offset,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return mapPage(query, projects.map(mapProject), total);
    }),
  );
});
