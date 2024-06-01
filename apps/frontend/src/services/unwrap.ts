import { parseApiError, type ApiError } from "./api/errors";

export async function unwrap<T, E = Error>(
  promise: Promise<T>,
): Promise<{ data: T; error: null } | { data: null; error: E }> {
  try {
    return { data: await promise, error: null };
  } catch (err) {
    return { data: null, error: err as E };
  }
}

export async function api<T>(
  promise: Promise<T>,
): Promise<{ data: T; error: null } | { data: null; error: ApiError }> {
  const res = await unwrap(promise);
  if (res.error) {
    return {
      data: null,
      error: parseApiError(res.error),
    }
  }
  return {
    data: res.data,
    error: null,
  }
}
