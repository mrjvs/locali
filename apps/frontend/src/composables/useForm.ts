import type { AnyZodObject, z } from "zod";

export type FormOptions<TInput extends z.infer<TSchema>, TSchema extends AnyZodObject> = {
  id: string;
  init: () => TInput,
  schema: TSchema,
}

export type FormValidateResult<TOutput> = {
  success: true,
  data: TOutput,
} | {
  success: false,
}

export type FormControls<TOutput> = {
  validate: () => FormValidateResult<TOutput>;
  reset: () => void;
  data: () => TOutput;
}

export function useForm<TSchema extends AnyZodObject>(ops: FormOptions<z.infer<TSchema>, TSchema>): FormControls<z.infer<TSchema>> {
  const data = ref(ops.init()) as Ref<z.infer<TSchema>>;

  return {
    reset() {
      data.value = ops.init();
    },
    validate() {
      const parsed = ops.schema.safeParse(data.value);
      if (!parsed.success) return { success: false };
      return {
        success: true,
        data: parsed.data,
      }
    },
    data() {
      return data.value;
    },
  }
}
