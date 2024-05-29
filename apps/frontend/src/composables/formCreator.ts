import type { AnyZodObject, z } from "zod";

export type FormOptions<TInput extends z.infer<TSchema>, TSchema extends AnyZodObject> = {
  id: string;
  init: () => TInput,
  schema: TSchema,
  plugins?: FormPlugin[];
}

export type FormValidateResult<TOutput> = {
  success: true,
  data: TOutput,
} | {
  success: false,
}

export type FormPlugin<TOutput = any> = {
  onValidationError?: (form: FormControls<TOutput>) => void;
  onFormError?: (form: FormControls<TOutput>) => void;
  onValidationSuccess?: (form: FormControls<TOutput>) => void;
  onClearErrors?: (form: FormControls<TOutput>) => void;
  onReset?: (form: FormControls<TOutput>) => void;
}

export type FormError = {
  text: string;
  id: string;
  clear: () => void;
}

export type FormErrorInsert = {
  validationErrors?: Array<{
    text: string;
    id: string;
  }>;
  formErrors?: Array<{
    text: string;
  }>;
}

export type FormControls<TOutput> = {
  id: string;
  validate: () => FormValidateResult<TOutput>;
  reset: () => void;
  data: () => TOutput;
  error: (key: string) => FormError | null;
  errors: {
    clear: () => void;
    validationErrors: () => Readonly<Record<string, string | undefined>>;
    formErrors: () => readonly string[];
    insert(errors: FormErrorInsert): void;
  }
}

export const FORM_PREFIX = "LCL_FORM::";

export function createFormComposable<TSchema extends AnyZodObject>(ops: FormOptions<z.infer<TSchema>, TSchema>): FormControls<z.infer<TSchema>> {
  const data = ref(ops.init()) as Ref<z.infer<TSchema>>;
  const errors = ref<Record<string, string | undefined>>({});
  const readOnlyErrors = readonly(errors);
  const formErrors = ref<string[]>([]);
  const readOnlyFormErrors = readonly(formErrors);

  const controls: FormControls<z.infer<TSchema>> = {
    id: ops.id,
    reset() {
      data.value = ops.init();
      errors.value = {};
      formErrors.value = [];
      ops.plugins?.forEach(p => p.onReset?.(controls));
    },
    error(key) {
      const err = errors.value[key];
      if (!err) return null;
      return {
        id: FORM_PREFIX + ops.id + "::" + key,
        clear() {
          errors.value[key] = undefined;
        },
        text: err,
      }
    },
    validate() {
      errors.value = {};
      formErrors.value = [];
      const parsed = ops.schema.safeParse(data.value);
      if (!parsed.success) {
        const flattened = parsed.error.flatten();
        const flatFieldErrors = Object.entries(flattened.fieldErrors);
        const flatFormErrors = flattened.formErrors;
        if (flatFieldErrors.length > 0) {
          flatFieldErrors.forEach(e => {
            if (e[1]) errors.value[e[0]] = e[1][0];
          });
          ops.plugins?.forEach(p => p.onValidationError?.(controls));
        }
        if (flatFormErrors.length > 0) {
          flatFormErrors.forEach(err => {
            formErrors.value.push(err)
          });
          ops.plugins?.forEach(p => p.onFormError?.(controls));
        }
        return { success: false };
      }

      ops.plugins?.forEach(p => p.onValidationSuccess?.(controls));
      return {
        success: true,
        data: parsed.data,
      }
    },
    data() {
      return data.value;
    },
    errors: {
      clear() {
        errors.value = {};
        formErrors.value = [];
        ops.plugins?.forEach(p => p.onClearErrors?.(controls));
      },
      validationErrors(){
        return readOnlyErrors.value;
      },
      formErrors() {
        return readOnlyFormErrors.value;
      },
      insert(insertErrors) {
        if (insertErrors.validationErrors && insertErrors.validationErrors.length > 0) {
          insertErrors.validationErrors.forEach(err => {
            errors.value[err.id] = err.text;
          })
          ops.plugins?.forEach(p => p.onValidationError?.(controls));
        }

        if (insertErrors.formErrors && insertErrors.formErrors.length > 0) {
          insertErrors.formErrors.forEach(err => {
            formErrors.value.push(err.text);
          })
          ops.plugins?.forEach(p => p.onFormError?.(controls));
        }
      },
    }
  }

  return controls;
}
