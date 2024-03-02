import { Injectable } from '@nestjs/common';
import { CreateQuestionDto, SearchSolvedQuestionsDto } from './dto/questions';
import { UpdateQuestionDto } from './dto/update-question.dto';
import x from './questions';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = await this.questionRepository.findOne({
        where: {
          questionid: createQuestionDto.questionid,
        },
        relations: ['users'],
      });
      if (!question) {
        return {
          message: 'Question Not Found',
          status: 404,
        };
      }
      const user = await this.userRepository.findOne({
        where: {
          id: createQuestionDto.userid,
        },
      });
      if (!user) {
        return {
          message: 'User Not Found',
          status: 404,
        };
      }
      if (!question.users.some((u) => u.id === user.id)) {
        question.users.push(user);
        await this.questionRepository.save(question);
      }

      return {
        message: 'User added to the question successfully',
        status: 200,
      };
    } catch (e) {
      return {
        message: 'Error in solving question',
        error: e.message,
        status: 400,
      };
    }
  }
  async remove(createQuestionDto: CreateQuestionDto) {
    try {
      const question = await this.questionRepository.findOne({
        where: {
          questionid: createQuestionDto.questionid,
        },
        relations: ['users'],
      });
      if (!question) {
        return {
          message: 'Question Not Found',
          status: 404,
        };
      }
      const user = await this.userRepository.findOne({
        where: {
          id: createQuestionDto.userid,
        },
      });
      if (!user) {
        return {
          message: 'User Not Found',
          status: 404,
        };
      }
      if (question.users.some((u) => u.id === user.id)) {
        question.users = question.users.filter((u) => u.id !== user.id);
        await this.questionRepository.save(question);
      }

      return {
        message: 'User removed from the question successfully',
        status: 200,
      };
    } catch (e) {
      return {
        message: 'Error in removing user from question',
        error: e.message,
        status: 400,
      };
    }
  }
  async findAll(userId: SearchSolvedQuestionsDto) {
    const userWithSolvedQuestions = await this.userRepository.findOne({
      relations: ['questions'],
      where: {
        id: userId.userId,
      },
    });
    const allQuestionIds = userWithSolvedQuestions.questions.map(
      (q) => q.questionid,
    );
    return {
      message: 'All questions fetched successfully',
      status: 200,
      data: allQuestionIds,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }
  async addBulkQuestions() {
    const promises = [];
    x.data.forEach((questions) => {
      questions.sub_steps.forEach((question) => {
        question.topics.forEach((q) => {
          promises.push(
            this.questionRepository.save({
              questionid: q.id,
              title: questions.title,
              subtitle: question.title,
              subsubtitle: q.title,
            }),
          );
        });
      });
    });
    await Promise.all(promises);

    return {
      message: 'Questions added successfully',
      status: 201,
    };
  }
}