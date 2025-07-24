import { Test, TestingModule } from '@nestjs/testing';
import { ConventionsController } from './conventions.controller';

describe('ConventionsController', () => {
  let controller: ConventionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConventionsController],
    }).compile();

    controller = module.get<ConventionsController>(ConventionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
