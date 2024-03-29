import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code, ExtraDsaCode } from './entities/code.entity';
import { User } from '../user/entities/user.entity';
import { Question } from '../questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code, User, Question, ExtraDsaCode])],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
