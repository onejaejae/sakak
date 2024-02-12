import { EntityTarget } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Food } from './food.entity';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { GetFoodsQueryDto } from 'src/common/request/food/getFoodsQueryDto';
import { PaginationBuilder } from 'src/common/pagination/pagination.builder';
import { plainToInstance } from 'class-transformer';
import { PaginationResponse } from 'src/common/pagination/pagination.response';
import { IFoodRepository } from './food-repository.interface';

@Injectable()
export class FoodRepository
  extends GenericTypeOrmRepository<Food>
  implements IFoodRepository
{
  constructor(protected readonly txManager: TransactionManager) {
    super(Food);
  }

  getName(): EntityTarget<Food> {
    return Food.name;
  }

  async getFoods(
    getFoodsQueryDto: GetFoodsQueryDto,
  ): Promise<PaginationResponse<Food>> {
    const { page, take, foodCd, foodName, researchYear, makerName } =
      getFoodsQueryDto;

    const queryBuilder = this.getQueryBuilder();

    if (foodCd) {
      queryBuilder.andWhere('food.foodCd LIKE :foodCd', {
        foodCd: `${foodCd}%`,
      });
    }
    if (foodName) {
      queryBuilder.andWhere('food.foodName LIKE :foodName', {
        foodName: `${foodName}%`,
      });
    }
    if (researchYear) {
      queryBuilder.andWhere('food.researchYear LIKE :researchYear', {
        researchYear: `${researchYear}%`,
      });
    }
    if (makerName) {
      queryBuilder.andWhere('food.makerName LIKE :makerName', {
        makerName: `${makerName}%`,
      });
    }

    const [data, total] = await Promise.all([
      queryBuilder
        .skip((page - 1) * take)
        .take(take)
        .getRawMany(),
      queryBuilder.getCount(),
    ]);

    return new PaginationBuilder<Food>()
      .setData(plainToInstance(Food, data))
      .setPage(page)
      .setTake(take)
      .setTotalCount(total)
      .build();
  }
}
