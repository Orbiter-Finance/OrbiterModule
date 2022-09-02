import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { isLocal } from './shared/env';

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
  
  await app.listen(3000);
}
bootstrap();