import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Food } from 'src/entities/food/food.entity';

export default class FoodSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const foodRepository = dataSource.getRepository(Food);

    await foodRepository.insert([
      {
        id: 1,
        foodCd: 'D000006',
        groupName: '음식',
        foodName: '꿩불고기',
        researchYear: '2019',
        makerName: '충주',
        refName: '외식영양성분자료집 통합본(2012-2017년)',
        servingSize: 500,
        calorie: 368.8,
        carbohydrate: 39.7,
        protein: 33.5,
        province: 8.5,
        sugars: 16.9,
        salt: 1264.31,
        cholesterol: 106.18,
        saturatedFattyAcids: 1.9,
        transFat: 0.1,
      },
    ]);
  }
}
