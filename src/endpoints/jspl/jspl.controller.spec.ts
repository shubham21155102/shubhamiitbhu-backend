import { Test, TestingModule } from '@nestjs/testing';
import { JsplController } from './jspl.controller';
import { JsplService } from './jspl.service';

describe('JsplController', () => {
  let controller: JsplController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsplController],
      providers: [JsplService],
    }).compile();

    controller = module.get<JsplController>(JsplController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
