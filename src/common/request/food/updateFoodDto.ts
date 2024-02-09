import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFoodDto {
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

  @IsNumber()
  carbohydrate: number;

  @IsNumber()
  protein: number;

  @IsNumber()
  province: number;

  @IsNumber()
  sugars: number;

  @IsNumber()
  salt: number;

  @IsNumber()
  cholesterol: number;

  @IsNumber()
  saturatedFattyAcids: number;

  @IsNumber()
  transFat: number;
}
