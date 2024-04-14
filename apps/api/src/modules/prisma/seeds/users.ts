import { getId } from '@/utils/getId';
import { hashPassword } from '@/utils/auth/pass';
import { prisma } from '..';

export const userA = {
  id: getId('usr'),
  email: 'john@example.com',
  password: 'test',
};

export async function seedUsers() {
  prisma.user.create({
    data: {
      id: userA.id,
      email: userA.email,
      passwordHash: await hashPassword(userA.password),
    },
  });
}
