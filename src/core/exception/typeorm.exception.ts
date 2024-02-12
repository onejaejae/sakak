import { HttpStatus } from '@nestjs/common';
import { GeneralException } from './general.exception';
import { TypeORMError } from 'typeorm';

export class TypeORMException extends GeneralException {
  private readonly _originalError: TypeORMError;

  constructor(callClass: string, callMethod: string, err: TypeORMError) {
    super(
      callClass,
      callMethod,
      err.message,
      err.stack,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this._originalError = err;
  }

  get error() {
    return this._originalError;
  }
}
