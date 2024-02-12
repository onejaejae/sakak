import { PaginationResponse } from 'src/common/pagination/pagination.response';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';
import { GetFoodsQueryDto } from 'src/common/request/food/getFoodsQueryDto';
import { UpdateFoodDto } from 'src/common/request/food/updateFoodDto';
import { Food } from 'src/entities/food/food.entity';

export const FoodServiceKey = 'FoodServiceKey';

export interface IFoodService {
  getFoods(
    getFoodQueryDto: GetFoodsQueryDto,
  ): Promise<PaginationResponse<Food>>;
  getFood(foodId: number): Promise<Food>;
  createFood(createFoodDto: CreateFoodDto): Promise<Food>;
  updateFood(foodId: number, updateFoodDto: UpdateFoodDto): Promise<Food>;
  deleteFood(foodId: number): Promise<void>;
}
