import { BadRequestException, Injectable } from '@nestjs/common';
import { FoodRepository } from 'src/entities/food/food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}
}
