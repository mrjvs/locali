import { getId } from '@/utils/get-id';
import { orgRoles } from '@/utils/perms/roles';
import { prisma } from '..';
import { userA } from './users';

export const userAOrg = {
  id: getId('org'),
  name: 'Johns Org',
};

export async function seedOrgs() {
  await prisma.organisation.create({
    data: {
      id: userAOrg.id,
      name: userAOrg.name,
      members: {
        create: [
          {
            id: getId('orgmbr'),
            userId: userA.id,
            roles: [orgRoles.admin],
          },
        ],
      },
    },
  });
}
