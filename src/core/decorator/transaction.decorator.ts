import { InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import {
  SAKAK_ENTITY_MANAGER,
  SAKAK_NAMESPACE,
} from 'src/common/constant/nameSpace';

import { EntityManager } from 'typeorm';

export function Transactional() {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originMethod = descriptor.value;

    async function transactionWrapped(...args: unknown[]) {
      const nameSpace = getNamespace(SAKAK_NAMESPACE);
      if (!nameSpace || !nameSpace.active)
        throw new InternalServerErrorException(
          `${SAKAK_NAMESPACE} is not active`,
        );

      const em = nameSpace.get(SAKAK_ENTITY_MANAGER) as EntityManager;
      if (!em)
        throw new InternalServerErrorException(
          `Could not find EntityManager in ${SAKAK_NAMESPACE} nameSpace`,
        );

      return await em.transaction(
        process.env.NODE_ENV !== 'test' ? 'REPEATABLE READ' : 'SERIALIZABLE',
        async (tx: EntityManager) => {
          nameSpace.set(SAKAK_ENTITY_MANAGER, tx);
          return await originMethod.apply(this, args);
        },
      );
    }

    descriptor.value = transactionWrapped;
  };
}
