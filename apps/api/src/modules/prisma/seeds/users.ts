import { getId } from '@/utils/get-id';
import { hashPassword } from '@/utils/auth/pass';
import { appRoles } from '@/utils/perms/roles';
import { prisma } from '..';

export const admin = {
  id: getId('usr'),
  email: 'admin@lcl.dev',
  password: 'test',
};

export const userA = {
  id: getId('usr'),
  email: 'john@lcl.dev',
  password: 'test',
};

export async function seedUsers() {
  await prisma.user.create({
    data: {
      id: admin.id,
      email: admin.email,
      passwordHash: await hashPassword(admin.password),
      roles: [appRoles.admin],
    },
  });
  await prisma.user.create({
    data: {
      id: userA.id,
      email: userA.email,
      passwordHash: await hashPassword(userA.password),
    },
  });
}
