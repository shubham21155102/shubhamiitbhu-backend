import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { MyaiService } from './myai.service';
import { CreateMyAIDTO, PersonalBotDTO } from './dto/myai';
import { Response } from 'express';

@Controller('myai')
export class MyaiController {
  constructor(private readonly myaiService: MyaiService) {}
  @Get()
  @HttpCode(200)
  async getGithubRepos() {
    return this.myaiService.getGithubRepos();
  }
  @Post('commit')
  @HttpCode(201)
  async commitToGitHub(@Body() createMyAiDto: CreateMyAIDTO) {
    return this.myaiService.commitToGitHub(createMyAiDto);
  }
  // @Post('deepseek')
  // @HttpCode(200)
  // async deepSeek(@Body() query: string, @Res() res: Response) {
  //   console.log('Received query:', query);
  //   res.setHeader('Content-Type', 'text/event-stream');
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.setHeader('Connection', 'keep-alive');
  //   await this.myaiService.deepSeek(query, res);
  // }
  @Post('personalbot')
  @HttpCode(200)
  async personalBot(@Body() query: PersonalBotDTO) {
    return this.myaiService.myPersonalBot(query);
  }
}
