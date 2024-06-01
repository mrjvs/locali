import type { FormErrorInsert } from "~/composables/formCreator"
import { FetchError } from "ofetch"

type ApiErrorBase = {
  toFormError: () => FormErrorInsert;
}

export type ApiError = ApiErrorBase & ({
  type: "validation",
  errors: Array<{
    message: string;
  }>,
} | {
  type: "message",
  message: string,
} | {
  type: "code",
  code: ApiErrorCodes,
})

const apiErrorCodes = {
  "unknown": "Unknown error occured",
} as const;
export type ApiErrorCodes = keyof typeof apiErrorCodes;

function getFormError(err: ApiError): FormErrorInsert {
  return {
    formErrors: [{
      text: "hello", // TODO finish this
    }]
  }
}

function parseApiErrorObject(input: Record<string, any>): ApiError {
  const t = input.errorType;
  if (t === "validation")
    return {
      type: "validation",
      errors: input.errors,
      toFormError() {
        return getFormError(this);
      }
    }
  if (t === "message")
    return {
      type: "message",
      message: input.message,
      toFormError() {
        return getFormError(this);
      }
    }
  if (t === "code")
    return {
      type: "code",
      code: input.code,
      toFormError() {
        return getFormError(this);
      }
    }
  return {
    type: "code",
    code: "unknown",
    toFormError() {
      return getFormError(this);
    }
  }
}

export function parseApiError(input: any): ApiError {
  if (input instanceof FetchError && input.data)
    return parseApiError(input.data);
  if (input instanceof Error)
    return parseApiErrorObject({
      errorType: "message",
      message: input.toString(),
    })
  if (input.errorType)
    return parseApiErrorObject(input);
  return parseApiErrorObject({}); // makes an unknown error
}
