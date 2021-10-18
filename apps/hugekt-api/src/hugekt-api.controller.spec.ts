import { Test, TestingModule } from '@nestjs/testing';
import { HugektApiController } from './hugekt-api.controller';
import { HugektApiService } from './hugekt-api.service';

describe('HugektApiController', () => {
  let hugektApiController: HugektApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HugektApiController],
      providers: [HugektApiService],
    }).compile();

    hugektApiController = app.get<HugektApiController>(HugektApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hugektApiController.getHello()).toBe('Hello World!');
    });
  });
});
