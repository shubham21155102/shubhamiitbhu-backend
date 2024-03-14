import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { MyaiService } from './myai.service';
import { CreateMyAIDTO } from './dto/myai';

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
}
