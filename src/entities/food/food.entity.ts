import { BaseEntity } from 'src/core/database/typeorm/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'foods' })
export class Food extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 10 })
  foodCd: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  groupName: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  foodName: string;

  @Column({ type: 'varchar', nullable: false, length: 5 })
  researchYear: string;

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
}
