import { getId } from '@/utils/get-id';
import { prisma } from '..';
import { userAOrg } from './orgs';

export const orgAProjectA = {
  id: getId('prj'),
  name: 'Project A',
};

export async function seedProjects() {
  await prisma.project.create({
    data: {
      id: orgAProjectA.id,
      name: orgAProjectA.name,
      orgId: userAOrg.id,
    },
  });
}
