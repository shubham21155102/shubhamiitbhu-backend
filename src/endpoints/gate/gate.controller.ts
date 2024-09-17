import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GateService } from './gate.service';
import { CreateGateDto, FetchGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';

@Controller('gate')
export class GateController {
  constructor(private readonly gateService: GateService) {}

  @Post()
  create(@Body() createGateDto: CreateGateDto) {
    return this.gateService.create(createGateDto);
  }

  @Get()
  findAll(@Query() fetchGateDto: FetchGateDto) {
    console.log(fetchGateDto + 'fetchGateDto');
    return this.gateService.findAll(fetchGateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGateDto: UpdateGateDto) {
    return this.gateService.update(+id, updateGateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gateService.remove(+id);
  }
}
