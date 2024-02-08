import { Module } from '@nestjs/common';
import { FoodRepositoryModule } from 'src/entities/food/food-repository.module';

@Module({
  imports: [FoodRepositoryModule],
  controllers: [],
  providers: [],
})
export class FoodModule {}
