export class CreateGateDto {
  department: string;
  year: string;
  question: string;
  image: string;
  options: Record<string, string>;
  answer: string;
}
export class FetchGateDto {
  department: string;
  year: string;
  all: string;
}
