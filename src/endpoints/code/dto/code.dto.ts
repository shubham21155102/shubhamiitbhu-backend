import { IsString } from 'class-validator';

export class CreateCodeDto {
  @IsString()
  code: string;
  @IsString()
  submittedBy: string;
  @IsString()
  questionId: string;
  @IsString()
  language: string;
  @IsString()
  input: string;
}
export class CreateExtraDsaCodeDto extends CreateCodeDto {}
