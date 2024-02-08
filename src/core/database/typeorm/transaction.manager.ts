import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import {
  SAKAK_ENTITY_MANAGER,
  SAKAK_NAMESPACE,
} from 'src/common/constant/nameSpace';

import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace = getNamespace(SAKAK_NAMESPACE);
    if (!nameSpace || !nameSpace.active)
      throw new InternalServerErrorException(
        `${SAKAK_NAMESPACE} is not active`,
      );
    return nameSpace.get(SAKAK_ENTITY_MANAGER);
  }
}
