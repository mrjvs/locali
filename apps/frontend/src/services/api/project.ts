import { $api, type PageControls, type PageRes } from "./fetch";

export type ProjectRes = {
  id: string;
  name: string;
  createdAt: string;
}

export async function listProjects(orgId: string, page: PageControls) {
  return $api.fetch<PageRes<ProjectRes>>(`/api/v1/organisations/${orgId}/projects`, {
    query: page,
  });
}

export async function getProject(id: string) {
  return $api.fetch<ProjectRes>(`/api/v1/projects/${id}`);
}
