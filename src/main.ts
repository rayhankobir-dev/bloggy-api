import { NestExpressApplication } from '@nestjs/platform-express';
import { configureSwaggerUI } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Blog API');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
  });
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT', '4000'), 10);
  configureSwaggerUI(app);
  await app.listen(port);
  return `${await app.getUrl()}`;
}

bootstrap()
  .then((serverUrl) => logger.log(`Server is running at: ${serverUrl}`))
  .catch((error) => logger.error('Something went wrong!', error));
