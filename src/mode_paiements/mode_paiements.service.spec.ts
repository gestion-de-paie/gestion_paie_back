import { Test, TestingModule } from '@nestjs/testing';
import { ModePaiementsService } from './mode_paiements.service';

describe('ModePaiementsService', () => {
  let service: ModePaiementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModePaiementsService],
    }).compile();

    service = module.get<ModePaiementsService>(ModePaiementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
