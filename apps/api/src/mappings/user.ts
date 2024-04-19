import type { User } from '@prisma/client';
import type { PopulatedUser } from '@/utils/perms/resolve-roles';
import { resolveRolesForUser } from '@/utils/perms/resolve-roles';

export interface UserDto {
  id: string;
  email: string;
  createdAt: string;
}

export type ExpandedUserDto = UserDto & {
  permissions: string[];
};

export function mapUser(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}

export function mapExpandedUser(user: PopulatedUser): ExpandedUserDto {
  return {
    ...mapUser(user),
    permissions: resolveRolesForUser(user),
  };
}
