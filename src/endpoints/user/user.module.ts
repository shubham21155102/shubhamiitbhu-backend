import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Code } from '../code/entities/code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Code])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
