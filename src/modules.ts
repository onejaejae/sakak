import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { FoodModule } from './modules/food/food.module';

const applicationModules = [FoodModule];

@Module({
  imports: [CoreModule, ...applicationModules],
  controllers: [],
  providers: [],
})
export class Modules {}
