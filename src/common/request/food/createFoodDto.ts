import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Food } from 'src/entities/food/food.entity';

export class CreateFoodDto {
  @IsString()
  foodCd: string;

  @IsString()
  groupName: string;

  @IsString()
  foodName: string;

  @IsString()
  researchYear: string;

  @IsString()
  makerName: string;

  @IsString()
  refName: string;

  @IsNumber()
  servingSize: number;

  @IsNumber()
  calorie: number;

  @IsOptional()
  @IsNumber()
  carbohydrate: number;

  @IsOptional()
  @IsNumber()
  protein: number;

  @IsOptional()
  @IsNumber()
  province: number;

  @IsOptional()
  @IsNumber()
  sugars: number;

  @IsOptional()
  @IsNumber()
  salt: number;

  @IsOptional()
  @IsNumber()
  cholesterol: number;

  @IsOptional()
  @IsNumber()
  saturatedFattyAcids: number;

  @IsOptional()
  @IsNumber()
  transFat: number;

  toEntity() {
    return Food.of(
      this.foodCd,
      this.groupName,
      this.foodName,
      this.researchYear,
      this.makerName,
      this.refName,
      this.servingSize,
      this.calorie,
      this.carbohydrate,
      this.protein,
      this.province,
      this.sugars,
      this.salt,
      this.cholesterol,
      this.saturatedFattyAcids,
      this.transFat,
    );
  }
}
