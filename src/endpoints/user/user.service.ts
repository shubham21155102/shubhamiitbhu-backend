import { Injectable } from '@nestjs/common';
import { CreateUserDto, LogInDto } from './dto/user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto);
      return {
        message: 'User created successfully',
        status: 201,
        data: user,
      };
    } catch (e) {
      return {
        message: 'Error in creating user',
        error: e.message,
      };
    }
  }
  async logIn(logInDto: LogInDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: logInDto.username, password: logInDto.password },
      });
      if (user) {
        return {
          message: 'User logged in successfully',
          status: 200,
          data: user,
        };
      } else {
        return {
          message: 'Invalid username or password',
          status: 401,
        };
      }
    } catch (e) {
      return {
        message: 'Error in logging in',
        error: e.message,
      };
    }
  }

  healthCheck() {
    return {
      status: 200,
      message: 'Health check is successful',
    };
  }
}
