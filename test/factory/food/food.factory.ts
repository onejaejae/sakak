import { plainToInstance } from 'class-transformer';
import { CreateFoodDto } from 'src/common/request/food/createFoodDto';
import { UpdateFoodDto } from 'src/common/request/food/updateFoodDto';
import { Food } from 'src/entities/food/food.entity';

export class FoodFactory {
  mockFood() {
    return plainToInstance(Food, {
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
    });
  }

  generateCreateFoodDto() {
    const dto = new CreateFoodDto();
    dto.foodCd = 'test';
    dto.groupName = 'test';
    dto.foodName = 'test';
    dto.researchYear = '2000';
    dto.makerName = 'test';
    dto.refName = 'test';
    dto.servingSize = 100;
    dto.calorie = 100;

    return dto;
  }

  generateUpadetFoodDto() {
    const dto = new UpdateFoodDto();
    dto.foodCd = 'test';
    dto.groupName = 'test';
    dto.foodName = 'test';
    dto.researchYear = '2000';
    dto.makerName = 'test';
    dto.refName = 'test';
    dto.servingSize = 100;
    dto.calorie = 100;
    dto.carbohydrate = 100;
    dto.protein = 100;
    dto.province = 100;
    dto.sugars = 100;
    dto.salt = 100;
    dto.cholesterol = 100;
    dto.saturatedFattyAcids = 100;
    dto.transFat = 100;

    return dto;
  }
}
