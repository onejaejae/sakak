import { Inject, Injectable } from '@nestjs/common';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';
import { GetFoodsQueryDto } from 'src/common/request/food/getFoodsQueryDto';
import { UpdateFoodDto } from 'src/common/request/food/updateFoodDto';
import { Transactional } from 'src/core/decorator/transaction.decorator';
import {
  FoodRepositoryKey,
  IFoodRepository,
} from 'src/entities/food/food-repository.interface';

@Injectable()
export class FoodService {
  constructor(
    @Inject(FoodRepositoryKey) private readonly foodRepository: IFoodRepository,
  ) {}

  async getFoods(getFoodQueryDto: GetFoodsQueryDto) {
    return this.foodRepository.getFoods(getFoodQueryDto);
  }

  async getFood(foodId: number) {
    return this.foodRepository.findByIdOrThrow(foodId);
  }

  async createFood(createFoodDto: CreateFoodDto) {
    const foodEntity = createFoodDto.toEntity();

    return this.foodRepository.createEntity(foodEntity);
  }

  @Transactional()
  async updateFood(foodId: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findByIdOrThrow(foodId);
    const updatedFoodEntity = food.updateFood(updateFoodDto);

    return this.foodRepository.update(updatedFoodEntity);
  }

  async deleteFood(foodId: number) {
    await this.foodRepository.findByIdOrThrow(foodId);
    await this.foodRepository.deleteById(foodId);
  }
}
