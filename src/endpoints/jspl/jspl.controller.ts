import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { JsplService } from './jspl.service';
import {
  DeleteJSPLDTO,
  FilterJSPLDTO,
  JSPLCreateOrderDto,
} from './dto/jspl.dto';

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
  @Get('tippers')
  async fetchAllVehicles() {
    return this.jsplService.fetchAllVehicles();
  }
  @Post('tippers')
  async trackVehicle(@Body() data: { vehicleId: string }) {
    console.log(data);
    return this.jsplService.trackVehicle(data.vehicleId);
  }
  @Delete()
  async deleteTrips(@Body() deleteJSPLDTO: DeleteJSPLDTO) {
    return this.jsplService.deleteTrip(deleteJSPLDTO);
  }
  @Post('filter')
  async filterTrips(@Body() filterJSPLDTO: FilterJSPLDTO) {
    return this.jsplService.filterJSPLTrips(filterJSPLDTO);
  }
}
