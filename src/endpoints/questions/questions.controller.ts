import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, SearchSolvedQuestionsDto } from './dto/questions';
import { UpdateQuestionDto } from './dto/update-question.dto';

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
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }


}
