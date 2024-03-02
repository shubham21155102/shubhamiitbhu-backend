import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './paymentDto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
