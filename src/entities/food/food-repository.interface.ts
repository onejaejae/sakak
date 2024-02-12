import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Food } from './food.entity';
import { GetFoodsQueryDto } from 'src/common/request/food/getFoodsQueryDto';
import { PaginationResponse } from 'src/common/pagination/pagination.response';

export const FoodRepositoryKey = 'FoodRepositoryKey';

export interface IFoodRepository extends GenericRepository<Food> {
  getFoods(
    getFoodsQueryDto: GetFoodsQueryDto,
  ): Promise<PaginationResponse<Food>>;
}
