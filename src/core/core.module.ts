import {
  ClassProvider,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { SakakConfigModule } from './config/config.module';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';
import { TransactionMiddleware } from './middleware/transaction.middleware';
import { TransactionManager } from './database/typeorm/transaction.manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ApiResponseInterceptor } from './interceptor/apiResponse.interceptor';

const modules = [SakakConfigModule];
const providers = [TransactionManager];
const interceptors: ClassProvider[] = [
  { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
  { provide: APP_INTERCEPTOR, useClass: ApiResponseInterceptor },
];

@Global()
@Module({
  imports: [getTypeOrmModule(), ...modules],
  providers: [...providers, ...interceptors],
  exports: [...providers, ...modules],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
