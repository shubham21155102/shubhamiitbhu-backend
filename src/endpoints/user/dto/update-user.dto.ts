import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
