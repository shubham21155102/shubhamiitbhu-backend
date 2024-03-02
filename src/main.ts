import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Settings } from 'luxon';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Shubham IITBHU API Server')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${configService.getPort()}/`,
      'Local environment',
    )
    .addServer('https://api.shubhamiitbhu.in/', 'Development')
    .addServer('https://shubhamiitbhu-backend.onrender.com/', 'Production')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('', app, swaggerDocument);
  await app.listen(configService.getPort());
}
bootstrap();
