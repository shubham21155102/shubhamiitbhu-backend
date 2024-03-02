import { Module } from '@nestjs/common';
import { UserModule } from './endpoints/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { QuestionsModule } from './endpoints/questions/questions.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(configService.typeOrmAsyncConfig),
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
