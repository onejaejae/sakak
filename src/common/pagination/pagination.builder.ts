import { PaginationResponse } from './pagination.response';

export class PaginationBuilder<T> {
  _list: T[];
  _page: number;
  _take: number;
  _totalCount: number;

  setData(data: T[]) {
    this._list = data;
    return this;
  }

  setPage(page: number) {
    this._page = page;
    return this;
  }

  setTake(take: number) {
    this._take = take;
    return this;
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
    return this;
  }

  build() {
    return new PaginationResponse(this);
  }
}
