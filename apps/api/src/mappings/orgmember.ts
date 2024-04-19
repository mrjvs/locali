import type { OrgMember, User } from '@prisma/client';
import type { UserDto } from './user';
import { mapUser } from './user';

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
