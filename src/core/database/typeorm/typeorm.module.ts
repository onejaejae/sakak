import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as OrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SakakConfigModule } from 'src/core/config/config.module';
import { SakakConfigService } from 'src/core/config/config.service';

const entityPath = path.join(__dirname + './../../../entities/*/*.entity.js');
export class TypeOrmModule {
  static forRoot(): DynamicModule {
    return OrmModule.forRootAsync({
      imports: [SakakConfigModule],
      inject: [SakakConfigService],
      useFactory: async (configService: SakakConfigService) => {
        const dbConfig = configService.getDBConfig();

        return {
          type: 'postgres',
          host: dbConfig.DB_HOST,
          port: Number(dbConfig.DB_PORT),
          database: dbConfig.DB_DATABASE,
          username: dbConfig.DB_USER_NAME,
          password: dbConfig.DB_PASSWORD,
          synchronize: process.env.NODE_ENV === 'dev',
          entities: [entityPath],
          logging: process.env.NODE_ENV === 'dev',
          namingStrategy: new SnakeNamingStrategy(),
          extra: {
            max: 10,
          },
        };
      },
    });
  }
}

export const getTypeOrmModule = (): DynamicModule => {
  return TypeOrmModule.forRoot();
};
