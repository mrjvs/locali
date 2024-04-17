import type { Project } from '@prisma/client';

export interface ProjectDto {
  id: string;
  name: string;
  createdAt: string;
}

export function mapProject(proj: Project): ProjectDto {
  return {
    id: proj.id,
    name: proj.name,
    createdAt: proj.createdAt.toISOString(),
  };
}
