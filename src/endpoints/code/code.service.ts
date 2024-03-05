import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Code } from './entities/code.entity';
import { Question } from '../questions/entities/question.entity';
import { exec } from 'child_process';
import * as fs from 'fs';
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
      const checkExistingCode = await this.codeRepository.findOne({
        where: {
          submittedBy: createCodeDto.submittedBy,
          questionId: createCodeDto.questionId,
        },
      });
      if (checkExistingCode) {
        checkExistingCode.code = createCodeDto.code;
        await this.codeRepository.save(checkExistingCode);
        return {
          message: 'Code updated successfully',
          status: 200,
        };
      }
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
  async runCode(createCodeDto: CreateCodeDto) {
    const code = createCodeDto.code;
    const language = 'cpp';
    try {
      if (language === 'cpp') {
        fs.writeFileSync(`codes/${createCodeDto.questionId}.cpp`, code);
      }
    } catch (e) {
      console.log(e);
    }

    return new Promise((resolve, reject) => {
      // const command = `cd "codes/" && g++ --std=c++17 ${createCodeDto.questionId}.cpp -o ${createCodeDto.questionId} && "codes/"${createCodeDto.questionId}`;
      // const command = `cd "/Users/shubham/Downloads/shubham/shubhamiitbhu-backend/codes/" && g++ --std=c++17 ${createCodeDto.questionId}.cpp -o ${createCodeDto.questionId} && "/Users/shubham/Downloads/shubham/shubhamiitbhu-backend/codes/"${createCodeDto.questionId}`;
      // exec(command, (error, stdout, stderr) => {
      //   if (error) {
      //     console.error(`exec error: ${error}`);
      //     reject({
      //       message: error,
      //       status: 400,
      //     });
      //   }

      //   console.log(`stdout: ${stdout}`);
      //   resolve({
      //     output: stdout,
      //     message: 'Code executed successfully',
      //     status: 200,
      //   });

      //   console.error(`stderr: ${stderr}`);
      // });
      const command = `gcc --version`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject({
            message: error,
            status: 400,
          });
        }

        console.log(`stdout: ${stdout}`);
        resolve({
          output: stdout,
          message: 'Code executed successfully',
          status: 200,
        });

        console.error(`stderr: ${stderr}`);
      });
    });
  }
  async checkGccVersion() {
    return new Promise((resolve, reject) => {
      const command = `gcc --version`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject({
            message: error,
            status: 400,
          });
        } else {
          console.log(`stdout: ${stdout}`);
          resolve({
            output: stdout,
            message: 'Code executed successfully',
            status: 200,
          });
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
      });
    });
  }
}
