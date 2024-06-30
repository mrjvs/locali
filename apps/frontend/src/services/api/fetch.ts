import { useAuthStore } from "~/store/auth"

export type PageControls = {
  limit?: number,
  offset?: number,
}

export type PageRes<T> = {
  data: T[];
  total: number;
  offset: number;
  count: number;
}

export const $api = {
  get fetch() {
    const config = useRuntimeConfig();
    const auth = useAuthStore();
    const headers = new Headers();
    if (auth.token) headers.append('Authorization', `Bearer ${auth.token}`);

    return $fetch.create({
      baseURL: config.public.apiBaseUrl,
      headers,
    })
  }
}
