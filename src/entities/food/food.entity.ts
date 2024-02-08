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
}
