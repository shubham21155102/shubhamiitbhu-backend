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
