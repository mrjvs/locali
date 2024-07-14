import type { WatchSource } from "vue";
import { unwrap } from "~/services/unwrap";

export interface ActionOptions<T, Args extends Array<any>> {
  action: (...args: Args) => Promise<T>
  onMount?: boolean;
  watch?: Array<WatchSource>;
}

export function useAction<T, E, Args extends Array<any>>(
  ops: ActionOptions<T, Args>
) {
  const success = ref(false);
  const pending = ref(false);
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<E | null>(null) as Ref<E | null>;

  async function execute(...args: Args) {
    success.value = false;
    data.value = null;
    pending.value = true;
    error.value = null;

    const prom = ops.action(...args);
    const results = await unwrap<T, E>(prom);
    pending.value = false;

    if (results.error) {
      error.value = results.error;
    } else {
      data.value = results.data;
      success.value = true;
    }

    return await prom.catch(() => {});
  }

  if (ops.onMount) (execute as any)();

  if (ops.watch && ops.watch.length > 0) {
    watch(ops.watch, () => {
      (execute as any)();
    })
  }

  return {
    execute,
    success,
    data,
    pending,
    error,
  };
}

export function useImmediateAction<T, E>(
  ops: ActionOptions<T, []>
) {
  return useAction<T, E, []>({
    onMount: true,
    ...ops,
  });
}
