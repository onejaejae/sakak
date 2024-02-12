import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FoodService } from '../service/food.service';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';
import { UpdateFoodDto } from 'src/common/request/food/updateFoodDto';
import { GetFoodsQueryDto } from 'src/common/request/food/getFoodsQueryDto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('')
  async getFoods(@Query() getFoodQueryDto: GetFoodsQueryDto) {
    return this.foodService.getFoods(getFoodQueryDto);
  }

  @Get('/:foodId')
  async getFood(@Param('foodId') foodId: number) {
    return this.foodService.getFood(foodId);
  }

  @Post('/')
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Patch('/:foodId')
  async updateFood(
    @Param('foodId') foodId: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.updateFood(foodId, updateFoodDto);
  }

  @Delete('/:foodId')
  async deleteFood(@Param('foodId') foodId: number) {
    return this.foodService.deleteFood(foodId);
  }
}
