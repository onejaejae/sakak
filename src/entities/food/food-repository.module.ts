import { Module } from '@nestjs/common';
import { FoodRepository } from './food.repository';

@Module({
  providers: [FoodRepository],
  exports: [FoodRepository],
})
export class FoodRepositoryModule {}
