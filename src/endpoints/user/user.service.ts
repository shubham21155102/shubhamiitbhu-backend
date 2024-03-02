import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { message: 'This action adds a new user' };
  }

  findAll() {
    return `This action returns all user`;
  }
  healthCheck() {
    return {
      status: 200,
      message: 'Health check is successful',
    };
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
