import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LogInDto } from './dto/user';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  async logIn(@Body() logInDto: LogInDto) {
    return this.userService.logIn(logInDto);
  }
}
