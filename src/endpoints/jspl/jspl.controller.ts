import { Body, Controller, Get, Post } from '@nestjs/common';
import { JsplService } from './jspl.service';
import { JSPLCreateOrderDto } from './dto/jspl.dto';

@Controller('jspl')
export class JsplController {
  constructor(private readonly jsplService: JsplService) {}
  @Post()
  async create(@Body() data: JSPLCreateOrderDto) {
    // console.log(data);
    return this.jsplService.create(data);
  }
  @Get()
  async getAllOrders() {
    return this.jsplService.getAllOrders();
  }
}
