import { Global, Module } from '@nestjs/common';
import { SakakConfigModule } from './config/config.module';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';

const modules = [SakakConfigModule];

@Global()
@Module({
  imports: [getTypeOrmModule(), ...modules],
  providers: [],
  exports: [...modules],
})
export class CoreModule {}
