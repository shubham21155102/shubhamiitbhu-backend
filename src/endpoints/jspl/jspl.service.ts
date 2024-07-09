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
  async fetchAllVehicles() {
    try {
      const vehicles = await fetch(
        'https://linqhaul.trackgpsfleet.com/api/v5/vehicles/movement_status?locale=en&vehicle_ids=778863,778869,779379,779380,779388,779429,779443,779451,779457,779464,779469,779723,779781,779784,779786,779789,780254,780259,778856,779375,779384,779434,779447,779454,779459,779461,779772,779773,779774,779776,780260,780264,778922,779381,778851',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'bsTKz__dQyKQupknNmCg',
          },
        },
      );
      const data = await vehicles.json();
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
