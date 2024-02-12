import { Expose } from 'class-transformer';
import { PaginationBuilder } from './pagination.builder';

export class PaginationResponse<T> {
  totalCount: number;
  list: Array<T>;
  page: number;
  take: number;

  constructor(paginationBuilder: PaginationBuilder<T>) {
    this.totalCount = paginationBuilder._totalCount;
    this.list = paginationBuilder._list;
    this.page = paginationBuilder._page;
    this.take = paginationBuilder._take;
  }

  @Expose()
  get totalPages(): number {
    return Math.ceil(this.totalCount / this.take);
  }

  @Expose()
  get hasNext(): boolean {
    return this.totalPages > this.page;
  }
}
