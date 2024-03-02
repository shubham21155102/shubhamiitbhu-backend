import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, SearchSolvedQuestionsDto } from './dto/questions';

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
}
