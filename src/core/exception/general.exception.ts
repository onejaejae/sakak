import { HttpException, HttpStatus } from '@nestjs/common';

export class GeneralException extends HttpException {
  private readonly _callClass: string;
  private readonly _callMethod: string;

  constructor(
    callClass: string,
    callMethod: string,
    payload: string | Record<string, any>,
    stack?: string,
    status?: number,
  ) {
    const messageOrPayload =
      typeof payload === 'string' ? { message: payload } : payload;

    const response = { ...messageOrPayload };
    if (process.env.NODE_ENV !== 'production') {
      response.callClass = callClass;
      response.callMethod = callMethod;
    }

    super(response, status || HttpStatus.INTERNAL_SERVER_ERROR);
    this._callClass = callClass;
    this._callMethod = callMethod;
    if (stack) this.stack = stack;
  }

  get callClass(): string {
    return this._callClass;
  }

  get callMethod(): string {
    return this._callMethod;
  }

  get CalledFrom(): string {
    return `${this._callClass}.${this._callMethod}`;
  }
}
