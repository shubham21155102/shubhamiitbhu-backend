import { Module } from '@nestjs/common';
import { UserModule } from './endpoints/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { QuestionsModule } from './endpoints/questions/questions.module';
import { PaymentModule } from './endpoints/payment/payment.module';
import { CodeModule } from './endpoints/code/code.module';
import { MyaiModule } from './endpoints/myai/myai.module';
import { JsplModule } from './endpoints/jspl/jspl.module';
import { GateModule } from './endpoints/gate/gate.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(configService.typeOrmAsyncConfig),
    QuestionsModule,
    PaymentModule,
    CodeModule,
    MyaiModule,
    JsplModule,
    GateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
