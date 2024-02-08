import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import {
  SAKAK_ENTITY_MANAGER,
  SAKAK_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(TransactionMiddleware.name);
  constructor(private readonly em: EntityManager) {}
  use(_req: Request, _res: Response, next: NextFunction) {
    const namespace =
      getNamespace(SAKAK_NAMESPACE) ?? createNamespace(SAKAK_NAMESPACE);
    this.logger.log(`Hit TransactionMiddleware`);

    return namespace.runAndReturn(async () => {
      this.logger.log(`SAKAK_NAMESPACE Run with status: ${!!namespace.active}`);
      Promise.resolve()
        .then(() => this.setEntityManager())
        .then(next);
    });
  }

  private setEntityManager() {
    const namespace = getNamespace(SAKAK_NAMESPACE)!;
    namespace.set(SAKAK_ENTITY_MANAGER, this.em);
  }
}
