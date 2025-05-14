import { Test, TestingModule } from '@nestjs/testing';
import { ModePaiementsController } from './mode_paiements.controller';
import { ModePaiementsService } from './mode_paiements.service';

describe('ModePaiementsController', () => {
  let controller: ModePaiementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModePaiementsController],
      providers: [ModePaiementsService],
    }).compile();

    controller = module.get<ModePaiementsController>(ModePaiementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
