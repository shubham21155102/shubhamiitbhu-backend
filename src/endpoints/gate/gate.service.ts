import { Injectable } from '@nestjs/common';
import { CreateGateDto, FetchGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GateService {
  constructor(
    @InjectRepository(Gate)
    private readonly gateRepository: Repository<Gate>,
  ) {}
  async create(createGateDto: CreateGateDto) {
    try {
      const gate = this.gateRepository.create(createGateDto);
      await this.gateRepository.save(gate);
      return gate;
    } catch (e) {
      console.log(e);
    }
  }

  findAll(fetchGateDto: FetchGateDto) {
    if (fetchGateDto.all) {
      return this.gateRepository.find();
    }
    if (fetchGateDto.department) {
      try {
        return this.gateRepository.find({
          where: {
            department: fetchGateDto.department,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (fetchGateDto.year) {
      try {
        return this.gateRepository.find({
          where: {
            year: fetchGateDto.year,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gate`;
  }

  update(id: number, updateGateDto: UpdateGateDto) {
    return `This action updates a #${id} gate`;
  }

  remove(id: number) {
    return `This action removes a #${id} gate`;
  }
}
