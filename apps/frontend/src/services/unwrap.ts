export async function unwrap<T, E = Error>(
  promise: Promise<T>,
): Promise<{ data: T; error: null } | { data: null; error: E }> {
  try {
    return { data: await promise, error: null };
  } catch (err) {
    return { data: null, error: err as E };
  }
}
