import { ClassProvider, Module } from '@nestjs/common';
import { FoodRepositoryModule } from 'src/entities/food/food-repository.module';
import { FoodController } from './controller/food.controller';
import { FoodService } from './service/food.service';
import { FoodServiceKey } from './interface/food-service.interface';

const foodService: ClassProvider = {
  provide: FoodServiceKey,
  useClass: FoodService,
};
@Module({
  imports: [FoodRepositoryModule],
  controllers: [FoodController],
  providers: [foodService],
})
export class FoodModule {}
