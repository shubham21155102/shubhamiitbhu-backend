import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeDto } from './code.dto';

export class UpdateCodeDto extends PartialType(CreateCodeDto) {}
