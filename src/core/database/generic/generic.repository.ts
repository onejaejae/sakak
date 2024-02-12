import { RootEntity } from '../typeorm/root.entity';

export interface GenericRepository<T extends RootEntity> {
  findOneOrThrow(filters: Partial<T>): Promise<T>;
  findByIdOrThrow(id: number): Promise<T>;
  createEntity(model: T): Promise<T>;
  deleteById(id: number);
  update(models: T): Promise<T>;
}
