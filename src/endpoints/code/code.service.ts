import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Code } from './entities/code.entity';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  async create(createCodeDto: CreateCodeDto) {
    try {
      // const user = await this.userRepository.findOne({
      //   where: { username: createCodeDto.submittedBy },
      // });
      // const question = await this.questionRepository.findOne({
      //   where: { questionid: createCodeDto.questionId },
      // });
      // const code = new Code();
      // code.code = createCodeDto.code;
      // code.submittedBy = user;
      // code.questionId = question;
      // await this.codeRepository.save(code);
      const code = await this.codeRepository.create(createCodeDto);
      await this.codeRepository.save(code);
    } catch (e) {
      console.log(e);
    }
    return {
      message: 'Code submitted successfully',
      status: 200,
    };
  }

  async getCodeByQuestionIdAAndUserId(questionId: string, userId: string) {
    if (!questionId || !userId)
      return {
        message: 'Please provide questionId and userId both',
        status: 400,
      };
    try {
      // const user = await this.userRepository.findOne({
      //   where: { username: userId },
      // });
      // const question = await this.questionRepository.findOne({
      //   where: { questionid: questionId },
      // });
      // return await this.codeRepository.find({
      //   where: { submittedBy: user, questionId: question },
      //   relations: ['submittedBy', 'questionId'],
      // });
      return await this.codeRepository.find({
        where: { submittedBy: userId, questionId: questionId },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
