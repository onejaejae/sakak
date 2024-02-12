import { ClassProvider, Module } from '@nestjs/common';
import { FoodRepository } from './food.repository';
import { FoodRepositoryKey } from './food-repository.interface';

export const foodRepository: ClassProvider = {
  provide: FoodRepositoryKey,
  useClass: FoodRepository,
};
@Module({
  providers: [foodRepository],
  exports: [foodRepository],
})
export class FoodRepositoryModule {}
