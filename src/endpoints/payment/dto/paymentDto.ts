import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePaymentDto {}

export class CashFreePaymentCreationDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;
  @IsString()
  @IsNotEmpty()
  customer_name: string;
  @IsString()
  @IsNotEmpty()
  customer_phone: string;
  @IsString()
  @IsNotEmpty()
  customer_email: string;
  // @IsString()
  // @IsNotEmpty()
  // order_id:string;
  // @IsString()
  @IsNotEmpty()
  order_amount: string;
  @IsString()
  @IsNotEmpty()
  order_note: string;
}
