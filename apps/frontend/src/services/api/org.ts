import { $api, type PageControls, type PageRes } from "./fetch";

export type OrgRes = {
  id: string;
  name: string;
  createdAt: string;
}

export async function listOrgs(page: PageControls) {
  return $api.fetch<PageRes<OrgRes>>('/api/v1/organisations', {
    query: page,
  });
}

export async function getOrg(id: string) {
  return $api.fetch<OrgRes>(`/api/v1/organisations/${id}`);
}
