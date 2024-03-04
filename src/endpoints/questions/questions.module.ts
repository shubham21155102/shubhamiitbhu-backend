import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { User } from '../user/entities/user.entity';
import { Code } from '../code/entities/code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, User, Code])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
