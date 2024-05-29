export type ErrorReporterOptions = {
  reportValidationErrors?: boolean,
}

export function makeErrorReporter(ops: ErrorReporterOptions): FormPlugin {
  const toasts = useToasts();
  function clear(id: string) {
    toasts.clearGroup(`form::${id}::errors`);
  }
  return {
    onValidationError(form) {
      if (ops.reportValidationErrors) {
        toasts.show({
          type: "error",
          title: "Not all fields are correct",
          description: "Please go back and correct them",
          button: "Show me",
          persistent: true,
          replaceGroup: `form::${form.id}::errors`,
          onClick() {
            alert('Scroll to a validation error')
          },
        });
      }
    },
    onFormError(form) {
      toasts.show({
        type: "error",
        title: "Something went wrong",
        description: "Try again later",
        hideAfterSeconds: 30,
        replaceGroup: `form::${form.id}::errors`,
      });
    },
    onReset: (form) => clear(form.id),
    onClearErrors: (form) => clear(form.id),
    onValidationSuccess: (form) => clear(form.id),
  }
}
