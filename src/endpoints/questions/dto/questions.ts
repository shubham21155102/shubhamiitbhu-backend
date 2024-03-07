import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  questionid: string;
  @IsNotEmpty()
  userid: string;
}
export class SearchSolvedQuestionsDto {
  @IsNotEmpty()
  userId: string;
}
export class CreateExtraDsaQuestionDto {
  @IsNotEmpty()
  tagid: string;
  @IsNotEmpty()
  tagtitle: string;
  @IsNotEmpty()
  questionid: string;
  @IsNotEmpty()
  questionlink: string;
  @IsNotEmpty()
  questionname: string;
}
export class GetExtraDSAQuestionsDTO {
  @IsNotEmpty()
  tagid: string;
}
