import type { ProjectMember, User } from '@prisma/client';
import type { UserDto } from './user';
import { mapUser } from './user';

export interface ProjectMemberDto {
  id: string;
  createdAt: string;
  projectId: string;
  user: UserDto;
}

export function mapProjectMember(
  member: ProjectMember & { user: User },
): ProjectMemberDto {
  return {
    id: member.id,
    createdAt: member.createdAt.toISOString(),
    projectId: member.projectId,
    user: mapUser(member.user),
  };
}
