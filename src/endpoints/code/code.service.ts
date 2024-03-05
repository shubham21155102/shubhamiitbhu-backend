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
      const currentDirectory = process.cwd();
      const filePath = `${currentDirectory}/codes/${createCodeDto.questionId}.cpp`;
      const outputFilePath = `${currentDirectory}/codes/${createCodeDto.questionId}`;

      const compileCommand = `g++ --std=c++17 ${filePath} -o ${outputFilePath}`;
      const executeCommand = `${outputFilePath}`;

      exec(compileCommand, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
          console.error(`Compilation error: ${compileError}`);
          reject({
            message: compileError,
            status: 400,
          });
          return;
        }

        console.log(`Compilation stdout: ${compileStdout}`);

        exec(executeCommand, (executeError, executeStdout, executeStderr) => {
          if (executeError) {
            console.error(`Execution error: ${executeError}`);
            reject({
              message: executeError,
              status: 400,
            });
            return;
          }

          console.log(`Execution stdout: ${executeStdout}`);
          exec(
            `rm -f ${filePath} ${outputFilePath}`,
            (removeError, removeStdout, removeStderr) => {
              if (removeError) {
                console.error(`Error deleting files: ${removeError}`);
                reject({
                  message: removeError,
                  status: 400,
                });
                return;
              }

              console.log('Files deleted successfully');

              resolve({
                output: executeStdout,
                message: 'Code executed successfully',
                status: 200,
              });
            },
          );
        });
      });
    });
  }
  checkGccVersion() {
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
  async gettingWorkingPath() {
    return {
      path: process.cwd(),
    };
  }

  async runCode1(createCodeDto: CreateCodeDto) {
    const code = createCodeDto.code;
    const formdata = new FormData();
    formdata.append('code', code);
    const requestOptions: RequestInit = {
      method: 'POST',
      body: formdata,
      redirect: 'follow' as RequestRedirect,
    };
    const res = await fetch(
      `https://try.w3schools.com/try_cpp.php?x=${Math.random().toPrecision(15)}`,
      requestOptions,
    );
    const data = await res.text();
    const regex = /<pre.*?>(.*?)<\/pre>/s;
    const found = data.match(regex);
    if (found) {
      return {
        output: found[1],
        message: 'Code executed successfully',
        status: 200,
      }
    }
  }
}
