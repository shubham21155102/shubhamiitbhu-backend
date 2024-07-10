import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDistance } from 'geolib';
import { Repository } from 'typeorm';
import { JSPLCreateOrderDto } from './dto/jspl.dto';
import { JSPLData } from '../user/entities/user.entity';
// import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JsplService {
  constructor(
    @InjectRepository(JSPLData)
    private readonly JSPLRepository: Repository<JSPLData>,
    // private readonly tipperTripsRepository: Repository<TipperTrips>,
    // private readonly logger = new Logger(JsplService.name),
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
  async trackVehicle(vehicleId: string) {
    console.log(vehicleId);
    try {
      const vehicles = await fetch(
        `https://linqhaul.trackgpsfleet.com/api/v5/trucks/${vehicleId}/movement_status?locale=en`,
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
  async trackVehicleWithCronJob(vehicleId: string) {
    console.log(vehicleId);
    try {
      const vehicles = await fetch(
        `https://linqhaul.trackgpsfleet.com/api/v5/trucks/${vehicleId}/movement_status?locale=en`,
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
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async trackVehicles() {
    const vIDs = [
      778863, 778869, 779379, 779380, 779388, 779429, 779443, 779451, 779457,
      779464, 779469, 779723, 779781, 779784, 779786, 779789, 780254, 780259,
      778856, 779375, 779384, 779434, 779447, 779454, 779459, 779461, 779772,
      779773, 779774, 779776, 780260, 780264, 778922, 779381, 778851,
    ];
    const CoalFaceCoordinate = { lat: 20.965328, lon: 84.956546 };
    const OBCoordinate = { lat: 20.960344, lon: 84.956451 };
    const CoalStockCoordinate = { lat: 20.960344, lon: 84.956451 };
    const rangeInMeters = 10;
    vIDs.map(async (vehicleId) => {
      const result = await this.trackVehicle(vehicleId.toString());
      const lat = result?.data?.data?.location?.lat;
      const lon = result?.data?.data?.location?.long;

      if (lat && lon) {
        const vehicleCoordinate = { lat, lon };

        if (
          getDistance(vehicleCoordinate, CoalFaceCoordinate) <= rangeInMeters
        ) {
          console.log(`Vehicle ${vehicleId} is at Coal Face`);
        } else if (
          getDistance(vehicleCoordinate, OBCoordinate) <= rangeInMeters
        ) {
          console.log(`Vehicle ${vehicleId} is at OB`);
        } else if (
          getDistance(vehicleCoordinate, CoalStockCoordinate) <= rangeInMeters
        ) {
          console.log(`Vehicle ${vehicleId} is at Coal Stock`);
        } else {
          console.log(
            `Vehicle ${vehicleId} is not within the specified range of any location`,
          );
        }

        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      }
    });
  }
}
