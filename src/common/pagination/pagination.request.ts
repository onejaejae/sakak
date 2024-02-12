import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export enum PaginationDefault {
  PAGE_DEFAULT = 1,
  TAKE_DEFAULT = 10,
}

export class PaginationRequest {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  take = 10;

  getSkip() {
    return (this.page - 1) * this.take;
  }

  getTake() {
    return this.take;
  }
}
