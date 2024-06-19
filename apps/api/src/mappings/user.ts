import type { User } from '@prisma/client';
import type { PopulatedUser } from '@/utils/perms/resolve-roles';
import { resolveRolesForUser } from '@/utils/perms/resolve-roles';
import { mapUserSideOrgMember, type UserSideOrgMemberDto } from './orgmember';
import {
  mapUserSideProjectMember,
  type UserSideProjectMemberDto,
} from './projectmember';

export interface UserDto {
  id: string;
  email: string;
  createdAt: string;
}

export type ExpandedUserDto = UserDto & {
  permissions: string[];
  projectMembers: UserSideProjectMemberDto[];
  orgMembers: UserSideOrgMemberDto[];
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
    projectMembers: user.projectMembers.map((v) => mapUserSideProjectMember(v)),
    orgMembers: user.orgMembers.map((v) => mapUserSideOrgMember(v)),
    permissions: resolveRolesForUser(user),
  };
}
