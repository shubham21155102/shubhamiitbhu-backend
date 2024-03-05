import { Controller, Post, Body, Get } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/code.dto';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post()
  async create(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.create(createCodeDto);
  }

  @Post('get-code-by-question-id-and-user-id')
  async getCodeByQuestionIdAAndUserId(
    @Body() data: { questionId: string; userId: string },
  ) {
    return this.codeService.getCodeByQuestionIdAAndUserId(
      data.questionId,
      data.userId,
    );
  }
  @Post('run-code')
  async runCode(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.runCode(createCodeDto);
  }
  @Get('get-gcc-version')
  async getGccVersion() {
    return this.codeService.checkGccVersion();
  }
}
