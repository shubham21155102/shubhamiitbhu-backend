import { Module } from '@nestjs/common';
import { JsplService } from './jspl.service';
import { JsplController } from './jspl.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JSPLData } from '../user/entities/user.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([JSPLData]), ScheduleModule.forRoot()],
  controllers: [JsplController],
  providers: [JsplService],
})
export class JsplModule {}
