import { Body, Controller, Post } from '@nestjs/common';
import { FoodService } from '../service/food.service';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('/')
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }
}
