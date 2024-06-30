import type { Project, ProjectMember, User } from '@prisma/client';
import type { UserDto } from './user';
import { mapUser } from './user';
import { mapProject, type ProjectDto } from './project';

export interface UserSideProjectMemberDto {
  id: string;
  createdAt: string;
  userId: string;
  project: ProjectDto;
}

export interface ProjectMemberDto {
  id: string;
  createdAt: string;
  projectId: string;
  user: UserDto;
}

export function mapUserSideProjectMember(
  member: ProjectMember & { project: Project },
): UserSideProjectMemberDto {
  return {
    id: member.id,
    userId: member.userId,
    createdAt: member.createdAt.toISOString(),
    project: mapProject(member.project),
  };
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
