import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { Code } from './entities/code.entity';
import { QuestionsModule } from '../questions/questions.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { Question } from '../questions/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code, User, Question]),
    forwardRef(() => QuestionsModule),
    forwardRef(() => UserModule),
  ],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
