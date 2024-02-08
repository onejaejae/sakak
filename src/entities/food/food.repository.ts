import { EntityTarget } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Food } from './food.entity';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';

@Injectable()
export class FoodRepository extends GenericTypeOrmRepository<Food> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Food);
  }

  getName(): EntityTarget<Food> {
    return Food.name;
  }
}
