import type { Project } from '@prisma/client';

export interface ProjectDto {
  id: string;
  name: string;
  description: string | null;
  orgId: string;
  createdAt: string;
}

export function mapProject(proj: Project): ProjectDto {
  return {
    id: proj.id,
    name: proj.name,
    description: proj.description ?? null,
    orgId: proj.orgId,
    createdAt: proj.createdAt.toISOString(),
  };
}
