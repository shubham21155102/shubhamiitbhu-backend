import { Module } from '@nestjs/common';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gate])],
  controllers: [GateController],
  providers: [GateService],
})
export class GateModule {}
