import { NestFactory } from '@nestjs/core';
import { Modules } from './modules';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SakakConfigService } from './core/config/config.service';
import { Logger } from '@nestjs/common';
import { setNestApp } from './setNestApp';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Modules);

  const configService = app.get(SakakConfigService);
  const appConfig = configService.getAppConfig();

  setNestApp(app);

  await app.listen(appConfig.PORT);
  Logger.log(`🧐 [SAKAK-API][${appConfig.ENV}] Started at: ${Date.now()}`);
  Logger.log(`🚀 Server open at ${appConfig.BASE_URL}:${appConfig.PORT}`);
}
bootstrap();
