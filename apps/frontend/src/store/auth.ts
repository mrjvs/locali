import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import { persistedState } from '#imports'
import { getCurrentUser, type ExpandedUserRes } from '~/services/api/auth';

export type UserState = {
  user: ExpandedUserRes;
}

const useInternalAuthStore = defineStore('internalauth', {
  state() {
    return {
      token: null as null | string,
    }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60, // 2 weeks
    }),
  },
})

export const useAuthStore = defineStore('auth', () => {
  const internal = useInternalAuthStore();
  const userState = ref<UserState | null>(null);
  const initialized = ref(false);
  const isAuthenticated = computed(() => !!userState.value);
  const token = computed(() => internal.token ?? null);
  const user = readonly(userState);

  function populate(state: UserState) {
    userState.value = state;
    initialized.value = true;
  }

  function clear() {
    internal.token = null;
    userState.value = null;
  }

  function setToken(newToken: string) {
    internal.token = newToken;
  }

  async function retrieve() {
    if (!token.value) {
      initialized.value = true;
      clear();
      return;
    }
    try {
      const res = await getCurrentUser();
      populate({
        user: res,
      })
      return;
    } catch (err) {
      if (err instanceof FetchError) {
        if (err.statusCode === 401 || err.statusCode === 403) {
          clear();
          return;
        }
      }
      console.error("couldn't get current user", err);
      throw err;
    }
  }

  async function logout() {
    try {
      if (user.value) await logout();
    } catch {}

    clear();
  }

  return {
    isAuthenticated,
    token,
    populate,
    retrieve,
    clear,
    setToken,
    logout,
    user,
    initialized: readonly(initialized),
  }
});
