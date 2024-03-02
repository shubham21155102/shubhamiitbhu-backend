import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Settings } from 'luxon';
import * as compression from 'compression';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  Settings.defaultZone = 'Asia/Kolkata';
  app.enableCors({
    origin: '*',
  });
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getPort());
  const config = new DocumentBuilder()
    .setTitle('Shubham IITBHU API Server')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${configService.getPort()}/`,
      'Local environment',
    )
    .addServer('https://dev.ostello.co.in/', 'Development')
    // .addServer('https://api2.ostello.co.in/', 'Production')
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('', app, document);
}
bootstrap();
