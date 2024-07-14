import type { OrgMember, Organisation, User } from '@prisma/client';
import type { UserDto } from './user';
import { mapUser } from './user';
import type { OrganisationDto } from './organisation';
import { mapOrganisation } from './organisation';

export interface UserSideOrgMemberDto {
  id: string;
  createdAt: string;
  userId: string;
  org: OrganisationDto;
}

export interface OrgMemberDto {
  id: string;
  createdAt: string;
  orgId: string;
  user: UserDto;
}

export function mapOrgMember(member: OrgMember & { user: User }): OrgMemberDto {
  return {
    id: member.id,
    createdAt: member.createdAt.toISOString(),
    orgId: member.orgId,
    user: mapUser(member.user),
  };
}

export function mapUserSideOrgMember(
  member: OrgMember & { org: Organisation },
): UserSideOrgMemberDto {
  return {
    id: member.id,
    createdAt: member.createdAt.toISOString(),
    org: mapOrganisation(member.org),
    userId: member.userId,
  };
}
