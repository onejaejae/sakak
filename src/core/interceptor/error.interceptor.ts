import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, of } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { TypeORMError } from 'typeorm';
  import { TypeORMException } from '../exception/typeorm.exception';
  
  @Injectable()
  export class ErrorInterceptor implements NestInterceptor {
    constructor() {}
  
    private propagateException(err: any, returnObj: Record<string, any>) {
      const { callClass, callMethod } = returnObj;
  
      switch (true) {
        case err instanceof TypeORMError:
          throw new TypeORMException(callClass, callMethod, err);
  
        default:
          break;
      }
    }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((err) => {
          const returnObj: Record<string, any> = {
            message: err.message,
          };
  
          returnObj.callClass = context.getClass().name;
          returnObj.callMethod = context.getHandler().name;
          returnObj.stack = err.stack;
  
          if (err instanceof HttpException) {
            const payload = err.getResponse();
            context.switchToHttp().getResponse().status(err.getStatus());
  
            return of({
              ...returnObj,
              ...(typeof payload === 'string' ? { message: payload } : payload),
            });
          }
  
          context
            .switchToHttp()
            .getResponse()
            .status(HttpStatus.INTERNAL_SERVER_ERROR);
  
          this.propagateException(err, returnObj);
  
          return of(returnObj);
        }),
      );
    }
  }
  