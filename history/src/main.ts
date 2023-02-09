import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getEnv, isLocal } from './shared/env';
import axios from "axios";
import { makerConfigs } from "./shared/configs";

async function bootstrap() {
  const appOptions: any = {
    cors: true,
    logger: ['error', 'warn', 'log', 'verbose'],
    bufferLogs: true,
  };
  const app = await NestFactory.create(ApplicationModule, appOptions);
  app.setGlobalPrefix('api');

  if (isLocal()) {
    const options = new DocumentBuilder()
      .setTitle('tradding-history-center')
      .setDescription('tradding history center')
      .setVersion('1.0')
      .setBasePath('api')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }

  if(getEnv('OPEN_API_BASE_URL')){
    if (process.env.OPEN_API_BASE_URL) {
      const response: any = await axios.get(
          `${process.env.OPEN_API_BASE_URL}/routes?apiKey=1`,
      );
      if (response?.data?.code === 0) {
        makerConfigs = response.data.result;
        console.log("Loading open api config");
      }
    }
  }
  
  await app.listen(3000);
}
bootstrap();