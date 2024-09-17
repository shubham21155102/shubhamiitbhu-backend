import { PartialType } from '@nestjs/mapped-types';
import { CreateGateDto } from './create-gate.dto';

export class UpdateGateDto extends PartialType(CreateGateDto) {
  department: string;
  year: string;
  question: string;
  image: string;
  options: Record<string, string>;
  answer: string;
}
