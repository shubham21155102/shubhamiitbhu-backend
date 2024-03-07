import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraDsaQuestion, Question } from './entities/question.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, User, ExtraDsaQuestion])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
