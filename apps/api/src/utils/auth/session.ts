import type {
  OrgMember,
  Project,
  ProjectMember,
  User,
  UserSession,
} from '@prisma/client';
import { prisma } from '@/modules/prisma';
import { getId } from '../get-id';
import { makeAuthToken } from './tokens';

const expiryInMs = 7 * 24 * 60 * 60 * 1000; // 7 days

export type PopulatedSession = UserSession & {
  user: User & {
    orgMembers: OrgMember[];
    projectMembers: (ProjectMember & { project: Project })[];
  };
};

export async function fetchSessionAndUpdateExpiry(
  id: string,
): Promise<PopulatedSession | null> {
  try {
    const session = await prisma.userSession.update({
      where: {
        id,
        expiresAt: {
          gte: new Date(), // only fetch if expiresAt is set in the future (greater than NOW)
        },
      },
      data: {
        expiresAt: new Date(Date.now() + expiryInMs), // new expiry date = NOW + expiry delay
      },
      include: {
        user: {
          include: {
            orgMembers: true,
            projectMembers: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });
    return session;
  } catch {
    return null;
  }
}

export async function createSession(user: User) {
  const session = await prisma.userSession.create({
    data: {
      expiresAt: new Date(Date.now() + expiryInMs), // new expiry date = NOW + expiry delay
      userId: user.id,
      id: getId('ses'),
    },
  });
  return session;
}

export function makeSessionToken(id: string): string {
  return makeAuthToken({
    t: 'session',
    id,
  });
}
