import { IsNotEmpty, IsOptional } from 'class-validator';
export class JSPLCreateOrderDto {
  @IsNotEmpty()
  vehicleType: string;
  @IsNotEmpty()
  vehicleId: string;
  @IsNotEmpty()
  startTime: string;
  @IsNotEmpty()
  endTime: string;
  @IsNotEmpty()
  shift: string;
  @IsNotEmpty()
  date: string;
}
export class DeleteJSPLDTO {
  @IsOptional()
  id: string;
  @IsOptional()
  deleteAll: boolean;
}
export class FilterJSPLDTO {
  @IsOptional()
  vehicleId: string;
  @IsOptional()
  vehicleType: string;
  @IsOptional()
  shiftOnly: string;
  @IsOptional()
  dateOnly: string;
  @IsOptional()
  shiftAndDate: boolean;
}
