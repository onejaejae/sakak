import { UpdateFoodDto } from 'src/common/request/food/updateFoodDto';
import { BaseEntity } from 'src/core/database/typeorm/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'foods' })
export class Food extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', nullable: false, length: 10 })
  foodCd: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  groupName: string;

  @Index()
  @Column({ type: 'varchar', nullable: false, length: 10 })
  foodName: string;

  @Index()
  @Column({ type: 'varchar', nullable: false, length: 5 })
  researchYear: string;

  @Index()
  @Column({ type: 'varchar', nullable: false, length: 30 })
  makerName: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  refName: string;

  @Column({ type: 'int', nullable: false })
  servingSize: number;

  @Column({ type: 'float', nullable: false })
  calorie: number;

  @Column({ type: 'float', default: 0 })
  carbohydrate: number;

  @Column({ type: 'float', default: 0 })
  protein: number;

  @Column({ type: 'float', default: 0 })
  province: number;

  @Column({ type: 'float', default: 0 })
  sugars: number;

  @Column({ type: 'float', default: 0 })
  salt: number;

  @Column({ type: 'float', default: 0 })
  cholesterol: number;

  @Column({ type: 'float', default: 0 })
  saturatedFattyAcids: number;

  @Column({ type: 'float', default: 0 })
  transFat: number;

  static of(
    foodCd: string,
    groupName: string,
    foodName: string,
    researchYear: string,
    makerName: string,
    refName: string,
    servingSize: number,
    calorie: number,
    carbohydrate: number,
    protein: number,
    province: number,
    sugars: number,
    salt: number,
    cholesterol: number,
    saturatedFattyAcids: number,
    transFat: number,
  ) {
    const food = new Food();
    food.foodCd = foodCd;
    food.groupName = groupName;
    food.foodName = foodName;
    food.researchYear = researchYear;
    food.makerName = makerName;
    food.refName = refName;
    food.servingSize = servingSize;
    food.calorie = calorie;
    food.carbohydrate = carbohydrate;
    food.protein = protein;
    food.province = province;
    food.sugars = sugars;
    food.salt = salt;
    food.cholesterol = cholesterol;
    food.saturatedFattyAcids = saturatedFattyAcids;
    food.transFat = transFat;

    return food;
  }

  updateFood(updateFoodDto: UpdateFoodDto) {
    const {
      foodCd,
      groupName,
      foodName,
      researchYear,
      makerName,
      refName,
      servingSize,
      calorie,
      carbohydrate,
      protein,
      province,
      sugars,
      salt,
      saturatedFattyAcids,
      cholesterol,
      transFat,
    } = updateFoodDto;

    this.foodCd = foodCd;
    this.groupName = groupName;
    this.foodName = foodName;
    this.researchYear = researchYear;
    this.makerName = makerName;
    this.refName = refName;
    this.servingSize = servingSize;
    this.calorie = calorie;
    this.carbohydrate = carbohydrate;
    this.protein = protein;
    this.province = province;
    this.sugars = sugars;
    this.salt = salt;
    this.cholesterol = cholesterol;
    this.saturatedFattyAcids = saturatedFattyAcids;
    this.transFat = transFat;

    return this;
  }
}
