import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlFetchService } from './graphql-fetch.service';

describe('GraphqlFetchService', () => {
  let service: GraphqlFetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlFetchService],
    }).compile();

    service = module.get<GraphqlFetchService>(GraphqlFetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
