export type ErrorReporterOptions = {
  reportValidationErrors?: boolean,
}

export function makeErrorReporter(ops: ErrorReporterOptions): FormPlugin {
  const toasts = useToasts();
  function clear(id: string) {
    toasts.clearGroup(`form::${id}::errors`);
  }
  return {
    setup(form) {
      onUnmounted(() => {
        clear(form.id);
      })
    },
    onValidationError(form) {
      // TODO if not validation errors are shown in UI, show an error
      if (ops.reportValidationErrors) {
        toasts.show({
          type: "error",
          title: "Not all fields are correct",
          description: "Please go back and correct them",
          button: "Show me",
          persistent: true,
          replaceGroup: `form::${form.id}::errors`,
          onClick() {
            alert('Scroll to a validation error') // TODO actually scroll
          },
        });
      }
    },
    onFormError(form) {
      toasts.show({
        type: "error",
        title: "Something went wrong",
        description: form.errors.formErrors()[0],
        hideAfterSeconds: 30,
        replaceGroup: `form::${form.id}::errors`,
      });
    },
    onReset: (form) => clear(form.id),
    onClearErrors: (form) => clear(form.id),
    onValidationSuccess: (form) => clear(form.id),
  }
}
