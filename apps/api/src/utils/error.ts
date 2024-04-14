const errorSymbol = Symbol('StatusError');

export class StatusError extends Error {
  errorStatusCode: number;
  [errorSymbol] = true;

  constructor(message: string, code: number) {
    super(message);
    this.errorStatusCode = code;
    this.message = message;
  }
}

export function isStatusError(err: any): err is StatusError {
  if (err[errorSymbol]) return true;
  return false;
}

export class NotFoundError extends StatusError {
  constructor() {
    super('Not found', 404);
  }
}
