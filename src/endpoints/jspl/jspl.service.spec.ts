import { Test, TestingModule } from '@nestjs/testing';
import { JsplService } from './jspl.service';

describe('JsplService', () => {
  let service: JsplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsplService],
    }).compile();

    service = module.get<JsplService>(JsplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
