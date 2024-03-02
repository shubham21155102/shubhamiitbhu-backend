import { Module } from '@nestjs/common';
import { UserModule } from './endpoints/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync(configService.typeOrmAsyncConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
