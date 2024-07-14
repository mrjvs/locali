export interface ModalControls {
  open(): void;
  close(): void;
  state: Readonly<Ref<boolean>>;
}

export interface ModalOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export function useModal(ops?: ModalOptions): ModalControls {
  const isOpen = ref(false);
  const readonlyIsOpen = readonly(isOpen);

  function open() {
    isOpen.value = true;
    ops?.onOpen?.();
  }

  function close() {
    isOpen.value = false;
    ops?.onClose?.();
  }

  return {
    open,
    close,
    state: readonlyIsOpen,
  };
}
