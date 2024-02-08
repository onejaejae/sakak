import { Global, Module } from '@nestjs/common';
import { SakakConfigModule } from './config/config.module';

const modules = [SakakConfigModule];

@Global()
@Module({
  imports: [...modules],
  providers: [],
  exports: [...modules],
})
export class CoreModule {}
