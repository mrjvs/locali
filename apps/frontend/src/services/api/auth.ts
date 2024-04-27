import { $api } from "./fetch";

export type UserRes = {
  id: string;
  email: string;
  createdAt: string;
}

export type ExpandedUserRes = UserRes & {
  permissions: string[];
}

export type LoginRes = {
  user: ExpandedUserRes;
  token: string
}

export type LoginInput = {
  email: string;
  password: string
}

export type LogoutRes = {
  id: string;
}

export async function login(input: LoginInput) {
  return $api.fetch<LoginRes>('/api/v1/auth/login', {
    method: 'POST',
    body: input,
  })
}

export async function getCurrentUser() {
  return $api.fetch<ExpandedUserRes>('/api/v1/users/@me');
}

export async function logout() {
  return $api.fetch<LogoutRes>('/api/v1/auth/logout', {
    method: 'POST',
  })
}
