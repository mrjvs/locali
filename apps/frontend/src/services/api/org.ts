import { $api, type PageControls, type PageRes } from "./fetch";

export type OrgRes = {
  id: string;
  name: string;
  createdAt: string;
}

export async function getOrgList(page: PageControls) {
  return $api.fetch<PageRes<OrgRes>>('/api/v1/organisations', {
    query: page,
  });
}
