import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  CreateExtraDsaQuestionDto,
  CreateQuestionDto,
  GetExtraDSAQuestionsDTO,
  SearchSolvedQuestionsDto,
} from './dto/questions';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }
  @Delete()
  remove(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.remove(createQuestionDto);
  }
  @Get('addbulk')
  async addBulkQuestions() {
    return this.questionsService.addBulkQuestions();
  }
  @Post('questions')
  findAll(@Body() userId: SearchSolvedQuestionsDto) {
    return this.questionsService.findAll(userId);
  }
  @Post('addextradsaquestion')
  async addExtraDsaQuestion(
    @Body() createExtraDsaQuestionDto: CreateExtraDsaQuestionDto,
  ) {
    return this.questionsService.addExtraDSAQuestions(
      createExtraDsaQuestionDto,
    );
  }
  @Get('extraquestions')
  async getExtraQuestions() {
    return this.questionsService.getExtraDSAQuestions();
  }
  @Post('extraquestionsbytagid')
  async getExtraQuestionsByTagId(
    @Body() getExtraDSAQuestionsDTO: GetExtraDSAQuestionsDTO,
  ) {
    // return getExtraDSAQuestionsDTO.tagid;
    return this.questionsService.getExtraQuestionByTagId(
      getExtraDSAQuestionsDTO,
    );
  }
}
