import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlFetchResolver } from './graphql-fetch.resolver';
import { GraphqlFetchService } from './graphql-fetch.service';

describe('GraphqlFetchResolver', () => {
  let resolver: GraphqlFetchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlFetchResolver, GraphqlFetchService],
    }).compile();

    resolver = module.get<GraphqlFetchResolver>(GraphqlFetchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
