import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FoodService } from '../service/food.service';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/:foodId')
  async getFood(@Param('foodId') foodId: number) {
    return this.foodService.getFood(foodId);
  }

  @Post('/')
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }
}
