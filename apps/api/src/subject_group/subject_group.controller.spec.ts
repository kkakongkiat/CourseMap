import { Test, TestingModule } from '@nestjs/testing';
import { SubjectGroupController } from './subject_group.controller';
import { SubjectGroupService } from './subject_group.service';

describe('SubjectGroupController', () => {
  let controller: SubjectGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectGroupController],
      providers: [SubjectGroupService],
    }).compile();

    controller = module.get<SubjectGroupController>(SubjectGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
