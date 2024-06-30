import { IsNotEmpty } from 'class-validator';

export class JSPLCreateOrderDto {
  @IsNotEmpty()
  vehicleType: string;
  @IsNotEmpty()
  vehicleId: string;
  @IsNotEmpty()
  startTime: string;
  @IsNotEmpty()
  endTime: string;
}
