import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SakakConfigModule } from './config/config.module';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';
import { TransactionMiddleware } from './middleware/transaction.middleware';

const modules = [SakakConfigModule];

@Global()
@Module({
  imports: [getTypeOrmModule(), ...modules],
  providers: [],
  exports: [...modules],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
