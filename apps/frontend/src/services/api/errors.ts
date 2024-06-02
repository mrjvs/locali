import type { FormErrorInsert } from "~/composables/formCreator"
import { FetchError } from "ofetch"
import type { ApiErrorCodes as RealApiErrorCodes } from "@repo/perms";

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

const apiErrorCodes: Record<ApiErrorCodes | "unknown", string> = {
  "unknown": "Unknown error occured",
  authInvalidToken: "Invalid or expired auth token",
  authMissingPermissions: "The user does not have access to this resource or action",
  authInvalidInput: "Invalid credentials have been supplied",
  notFound: "Resource could not be found",
};
export type ApiErrorCodes = RealApiErrorCodes | "unknown";

function getFormError(err: ApiError): FormErrorInsert {
  if (err.type === 'code')
    return {
      formErrors: [{
        text: apiErrorCodes[err.code] ?? apiErrorCodes.unknown,
      }],
    }
  if (err.type === 'message')
    return {
      formErrors: [{
        text: err.message,
      }],
    }
  return {
    validationErrors: [], // TODO fix this
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
