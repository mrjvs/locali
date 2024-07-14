import { $api } from "./fetch";

export type UserSearchResult = {
  id: string;
  name: string;
  email?: string;
  exactMatch: boolean;
}

export async function searchUsers(keyword: string) {
  return $api.fetch<UserSearchResult[]>('/api/v1/users/search', {
    method: 'POST',
    body: {
      keyword,
    },
  })
}
