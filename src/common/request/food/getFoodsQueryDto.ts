import { IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common/pagination/pagination.request';

export class GetFoodsQueryDto extends PaginationRequest {
  @IsOptional()
  @IsString()
  foodCd: string;

  @IsOptional()
  @IsString()
  foodName: string;

  @IsOptional()
  @IsString()
  researchYear: string;

  @IsOptional()
  @IsString()
  makerName: string;
}
