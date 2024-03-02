import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './questions';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
