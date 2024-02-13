import { Namespace, createNamespace, destroyNamespace } from 'cls-hooked';
import { DataSource } from 'typeorm';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BadRequestException } from '@nestjs/common';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { IFoodService } from '../interface/food-service.interface';
import { Food } from 'src/entities/food/food.entity';
import { FoodRepository } from 'src/entities/food/food.repository';
import { FoodService } from '../service/food.service';
import {
  SAKAK_ENTITY_MANAGER,
  SAKAK_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { GetFoodsQueryDto } from 'src/common/request/food/getFoodsQueryDto';
import { PaginationResponse } from 'src/common/pagination/pagination.response';
import { FoodFactory } from 'test/factory/food/food.factory';

describe('food service test', () => {
  // for testContainers
  jest.setTimeout(300_000);

  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let service: IFoodService;
  let namespace: Namespace;
  let foodFactory: FoodFactory;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    dataSource = await new DataSource({
      type: 'postgres',
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      username: container.getUsername(),
      password: container.getPassword(),
      synchronize: true,
      entities: [Food],
      namingStrategy: new SnakeNamingStrategy(),
    }).initialize();

    const txManager = new TransactionManager();
    const foodRepository = new FoodRepository(txManager);
    service = new FoodService(foodRepository);
    foodFactory = new FoodFactory();
  });

  beforeEach(() => {
    namespace = createNamespace(SAKAK_NAMESPACE);
  });

  afterEach(async () => {
    await dataSource.query('TRUNCATE TABLE foods CASCADE;');
    await dataSource.query('ALTER SEQUENCE foods_id_seq RESTART WITH 1;');
    destroyNamespace(SAKAK_NAMESPACE);
  });

  afterAll(async () => {
    await container.stop();
    await dataSource.destroy();
  });

  it('Should be defined', () => {
    expect(dataSource).toBeDefined();
    expect(namespace).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getFoods method', () => {
    it('query에 아무것도 주어지지 않았을 경우 - 전체 조회', async () => {
      //given
      const getFoodsQueryDto = new GetFoodsQueryDto();

      //when
      const result = await namespace.runAndReturn(async () => {
        namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.getFoods(getFoodsQueryDto);
      });

      //then
      expect(result).toBeInstanceOf(PaginationResponse);
      expect(result.totalCount).toBe(0);
      expect(result.page).toBe(1);
      expect(result.take).toBe(10);
    });

    it('query에 모든 조건이 주어졌을 경우 - 검색 조건 조회', async () => {
      //given
      const mockFood = foodFactory.mockFood();
      const food = await dataSource.manager.save(Food, mockFood);

      const getFoodsQueryDto = new GetFoodsQueryDto();
      getFoodsQueryDto.foodCd = food.foodCd;
      getFoodsQueryDto.foodName = food.foodName;
      getFoodsQueryDto.researchYear = food.researchYear;
      getFoodsQueryDto.makerName = food.makerName;

      //when
      const result = await namespace.runAndReturn(async () => {
        namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.getFoods(getFoodsQueryDto);
      });

      //then
      expect(result).toBeInstanceOf(PaginationResponse);
      expect(result.totalCount).toBe(1);
      expect(result.page).toBe(1);
      expect(result.take).toBe(10);
    });
  });

  describe('getFood method', () => {
    it('존재하지 않는 foodId일 경우 - 실패', async () => {
      //given
      const unExistFoodId = 100000;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.getFood(unExistFoodId);
        }),
      ).rejects.toThrow(
        new BadRequestException(`don't exist ${unExistFoodId}`),
      );
    });

    it('단일 조회 성공', async () => {
      //given
      const mockFood = foodFactory.mockFood();
      const food = await dataSource.manager.save(Food, mockFood);
      const foodId = food.id;

      //when
      const result = await namespace.runAndReturn(async () => {
        namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.getFood(foodId);
      });

      //then
      expect(result.id).toBe(foodId);
    });
  });

  describe('createFood method', () => {
    it('food 생성 성공', async () => {
      //given
      const createFoodDto = foodFactory.generateCreateFoodDto();

      //when
      const result = await namespace.runAndReturn(async () => {
        namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.createFood(createFoodDto);
      });

      // then
      expect(result.foodCd).toBe(createFoodDto.foodCd);
      expect(result.foodName).toBe(createFoodDto.foodName);
    });
  });

  describe('updateFood method', () => {
    it('food 생성 성공', async () => {
      //given
      const mockFood = foodFactory.mockFood();
      const food = await dataSource.manager.save(Food, mockFood);
      const foodId = food.id;
      const updateFoodDto = foodFactory.generateUpadetFoodDto();

      //when
      const result = await namespace.runAndReturn(async () => {
        namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.updateFood(foodId, updateFoodDto);
      });

      // then
      expect(result.id).toBe(foodId);
      expect(result.foodName).toBe(updateFoodDto.foodName);
      expect(result.foodCd).toBe(updateFoodDto.foodCd);
    });
  });

  describe('deleteFood method', () => {
    it('foodId가 존재하지 않을 경우 - 실패', async () => {
      //given
      const unExistFoodId = 100000;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.deleteFood(unExistFoodId);
        }),
      ).rejects.toThrow(
        new BadRequestException(`don't exist ${unExistFoodId}`),
      );
    });

    it('food soft 삭제 성공', async () => {
      //given
      const mockFood = foodFactory.mockFood();
      const food = await dataSource.manager.save(Food, mockFood);
      const foodId = food.id;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(SAKAK_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.deleteFood(foodId);
        }),
      ).resolves.not.toThrow();
    });
  });
});
