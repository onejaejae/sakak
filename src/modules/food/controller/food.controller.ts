import { Controller } from '@nestjs/common';
import { FoodService } from '../service/food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
}
