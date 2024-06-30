import type { UserRes } from "./auth";
import { $api, type PageControls, type PageRes } from "./fetch";

export type ProjectRes = {
  id: string;
  name: string;
  description: string | null;
  orgId: string;
  createdAt: string;
}

export type UserSideProjectMemberRes = {
  id: string;
  createdAt: string;
  userId: string;
  project: ProjectRes;
}

export type ProjectMemberRes = {
  id: string;
  createdAt: string;
  projectId: string;
  user: UserRes,
}

export type OrgCreatePayload = {
  name: string;
  description: string | null;
}

export async function listProjects(orgId: string, page: PageControls) {
  return $api.fetch<PageRes<ProjectRes>>(`/api/v1/organisations/${orgId}/projects`, {
    query: page,
  });
}

export async function getProject(id: string) {
  return $api.fetch<ProjectRes>(`/api/v1/projects/${id}`);
}

export async function createProject(orgId: string, payload: OrgCreatePayload) {
  return $api.fetch<ProjectRes>(`/api/v1/organisations/${orgId}/projects`, {
    method: "POST",
    body: payload
  });
}
