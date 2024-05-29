import { defineStore } from 'pinia'

export type Toast = {
  type: "error";
  title: string;
  description?: string;
  button?: string;
  onClick?: () => void;
  hideAfterSeconds?: number; // defaults to 15 seconds
  persistent?: boolean; // dont automatically hide after a timeout
  replaceGroup?: string; // remove existing toasts with the same replaceGroup value
}

export type ToastItem = {
  id: number;
  state: "showing" | "hiding";
  toast: Toast;
}

export const useToasts = defineStore('toast', () => {
  const toasts = ref<ToastItem[]>([]);
  const readonlyToasts = readonly(toasts);
  const idNum = ref(0);

  function show(toast: Toast) {
    const id = idNum.value++;
    if (toast.replaceGroup)
      clearGroup(toast.replaceGroup);
    toasts.value.push({
      id,
      state: "showing",
      toast,
    });

    if (!toast.persistent) {
      setTimeout(() => {
        hide(id);
      }, (toast.hideAfterSeconds ?? 15) * 1000);
    }
    return id;
  }

  function remove(id: number) {
    toasts.value = toasts.value.filter(v=>v.id !== id);
  }

  function hide(id: number) {
    toasts.value = toasts.value.map(v => {
      if (v.id === id) {
        v.state = 'hiding';
        setTimeout(() => {
          remove(id);
        }, 10 * 1000); // assume animation is finished after 10 seconds
        return v;
      }
      return v;
    });
  }

  function clear() {
    toasts.value.forEach(t => {
      hide(t.id);
    })
  }

  function clearGroup(replaceGroup: string) {
    toasts.value = toasts.value.map(v => {
      if (v.toast.replaceGroup === replaceGroup) {
        v.state = 'hiding';
        setTimeout(() => {
          remove(v.id);
        }, 10 * 1000); // assume animation is finished after 10 seconds
        return v;
      }
      return v;
    });
  }

  return {
    all: readonlyToasts,
    show,
    hide,
    clear,
    clearGroup,
  }
});
