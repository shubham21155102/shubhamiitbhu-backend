import { Test, TestingModule } from '@nestjs/testing';
import { MyaiService } from './myai.service';

describe('MyaiService', () => {
  let service: MyaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyaiService],
    }).compile();

    service = module.get<MyaiService>(MyaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
