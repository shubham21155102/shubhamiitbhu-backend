import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CashFreePaymentCreationDto } from './dto/paymentDto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Response } from 'express';
// import { SkipCache } from 'src/cache';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() cashFreePaymentCreationDto: CashFreePaymentCreationDto) {
    return this.paymentService.newOrder(cashFreePaymentCreationDto);
  }
  @Get()
  // @SkipCache()
  async checkPaymentStatus(
    @Query('order_id') order_id: string,
    @Res() res: Response,
  ) {
    console.log('order_id', order_id);
    return this.paymentService.checkStatus(order_id, res);
  }
  @Get('all')
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
