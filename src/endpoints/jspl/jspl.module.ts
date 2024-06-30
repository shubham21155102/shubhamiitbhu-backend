import { Module } from '@nestjs/common';
import { JsplService } from './jspl.service';
import { JsplController } from './jspl.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JSPLData } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JSPLData])],
  controllers: [JsplController],
  providers: [JsplService],
})
export class JsplModule {}
