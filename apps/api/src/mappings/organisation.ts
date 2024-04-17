import type { Organisation } from '@prisma/client';

export interface OrganisationDto {
  id: string;
  name: string;
  createdAt: string;
}

export function mapOrganisation(org: Organisation): OrganisationDto {
  return {
    id: org.id,
    name: org.name,
    createdAt: org.createdAt.toISOString(),
  };
}
