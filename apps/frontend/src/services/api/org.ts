import type { UserRes } from "./auth";
import { $api, type PageControls, type PageRes } from "./fetch";

export type OrgRes = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export type OrgCreatePayload = {
  name: string;
  description: string | null;
}

export type UserSideOrgMemberRes = {
  id: string;
  createdAt: string;
  userId: string;
  org: OrgRes;
}

export type OrgMemberRes = {
  id: string;
  createdAt: string;
  orgId: string;
  user: UserRes,
}

export async function listOrgs(page: PageControls) {
  return $api.fetch<PageRes<OrgRes>>('/api/v1/organisations', {
    query: page,
  });
}

export async function getOrg(id: string) {
  return $api.fetch<OrgRes>(`/api/v1/organisations/${id}`);
}1

export async function createOrg(payload: OrgCreatePayload) {
  return $api.fetch<OrgRes>(`/api/v1/organisations`, {
    method: "POST",
    body: payload
  });
}

export async function listOrgMembers(id: string, page: PageControls) {
  return $api.fetch<PageRes<OrgMemberRes>>(`/api/v1/organisations/${id}/members`, {
    query: page,
  });
}
