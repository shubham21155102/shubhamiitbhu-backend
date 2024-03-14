import { Test, TestingModule } from '@nestjs/testing';
import { MyaiController } from './myai.controller';
import { MyaiService } from './myai.service';

describe('MyaiController', () => {
  let controller: MyaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyaiController],
      providers: [MyaiService],
    }).compile();

    controller = module.get<MyaiController>(MyaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
