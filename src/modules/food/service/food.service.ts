import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';
import { FoodRepository } from 'src/entities/food/food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getFood(foodId: number) {
    return this.foodRepository.findByIdOrThrow(foodId);
  }

  async createFood(createFoodDto: CreateFoodDto) {
    const foodEntity = createFoodDto.toEntity();

    return this.foodRepository.createEntity(foodEntity);
  }
}
