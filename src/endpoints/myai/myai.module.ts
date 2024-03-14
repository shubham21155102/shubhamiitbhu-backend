import { Module } from '@nestjs/common';
import { MyaiService } from './myai.service';
import { MyaiController } from './myai.controller';

@Module({
  controllers: [MyaiController],
  providers: [MyaiService],
})
export class MyaiModule {}
