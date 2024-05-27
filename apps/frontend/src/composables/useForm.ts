import type { AnyZodObject, z } from "zod";
import type { FormControls, FormOptions } from "./formCreator";

export function useForm<TSchema extends AnyZodObject>(ops: FormOptions<z.infer<TSchema>, TSchema>): FormControls<z.infer<TSchema>> {
  return createFormComposable(ops);
}
