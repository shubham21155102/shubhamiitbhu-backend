import { Module } from '@nestjs/common';
import { UserModule } from './endpoints/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';
import { QuestionsModule } from './endpoints/questions/questions.module';
import { PaymentModule } from './endpoints/payment/payment.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(configService.typeOrmAsyncConfig),
    QuestionsModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
