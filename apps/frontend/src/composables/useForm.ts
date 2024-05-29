import type { AnyZodObject, z } from "zod";
import type { FormControls, FormOptions } from "./formCreator";
import { makeErrorReporter } from "./forms/formErrorReporter";

export type ExpandedFormOptions = {
  showValidationToast?: boolean,
}

export function useForm<TSchema extends AnyZodObject>(ops: FormOptions<z.infer<TSchema>, TSchema> & ExpandedFormOptions): FormControls<z.infer<TSchema>> {
  return createFormComposable({
    ...ops,
    plugins: [
      makeErrorReporter({
        reportValidationErrors: ops.showValidationToast,
      }),
      ...(ops.plugins ?? [])
    ]
});
}
