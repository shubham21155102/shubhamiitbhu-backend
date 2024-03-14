import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { CreateMyAIDTO } from './dto/myai';
@Injectable()
export class MyaiService {
  async getGithubRepos() {
    return new Promise((resolve, reject) => {
      const command = 'gh repo list';
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
  async commitToGitHub(createMyAiDto: CreateMyAIDTO) {
    return new Promise((resolve, reject) => {
      const commands = `git add . && git commit -m"${createMyAiDto.commitDetails}" && git push`;
      exec(commands, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
}
