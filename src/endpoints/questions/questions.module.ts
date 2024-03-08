import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ExtraDsaQuestion,
  Question,
  QuestionTags,
} from './entities/question.entity';
import { User } from '../user/entities/user.entity';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from '@redis/client';
import { redisStore } from 'cache-manager-redis-yet';
import { configService } from 'src/config/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, User, ExtraDsaQuestion, QuestionTags]),
    CacheModule.register<RedisClientOptions>({
      ttl: 60,
      isGlobal: true,
      store: redisStore,
      url: configService.getRedisConnectionString(),
    }),
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class QuestionsModule {}
