import { Module } from '@nestjs/common';
import { FoodRepositoryModule } from 'src/entities/food/food-repository.module';
import { FoodController } from './controller/food.controller';
import { FoodService } from './service/food.service';

@Module({
  imports: [FoodRepositoryModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
