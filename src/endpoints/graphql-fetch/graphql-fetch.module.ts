import { Module } from '@nestjs/common';
import { GraphqlFetchService } from './graphql-fetch.service';
import { UserResolver } from './graphql-fetch.resolver';

@Module({
  providers: [UserResolver, GraphqlFetchService],
})
export class GraphqlFetchModule {}
