import { Test, TestingModule } from '@nestjs/testing';
import { AdmissionsController } from './admissions.controller';

describe('AdmissionsController', () => {
  let controller: AdmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdmissionsController],
    }).compile();

    controller = module.get<AdmissionsController>(AdmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
