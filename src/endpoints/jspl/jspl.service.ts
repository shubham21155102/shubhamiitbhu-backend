import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { JSPLCreateOrderDto } from './dto/jspl.dto';
import { JSPLData } from '../user/entities/user.entity';

@Injectable()
export class JsplService {
  constructor(
    @InjectRepository(JSPLData)
    private readonly JSPLRepository: Repository<JSPLData>,
  ) {}
  async create(data: JSPLCreateOrderDto) {
    // const vehicleType = data.vehicleType;
    // const vehicleId = data.vehicleId;
    // const startTime = data.startTime;
    // const ensTime = data.endTime;
    try {
      const order = await this.JSPLRepository.save(data);
      return {
        status: 201,
        message: 'Order created successfully',
        data: order,
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async getAllOrders() {
    const orders = await this.JSPLRepository.find();
    return {
      status: 200,
      data: orders,
    };
  }
}
