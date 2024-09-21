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
import { GraphqlFetchModule } from './endpoints/graphql-fetch/graphql-fetch.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({}),
    UserModule,
    TypeOrmModule.forRootAsync(configService.typeOrmAsyncConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // autoSchemaFile: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    GraphqlFetchModule,
    QuestionsModule,
    PaymentModule,
    CodeModule,
    MyaiModule,
    JsplModule,
    GateModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
