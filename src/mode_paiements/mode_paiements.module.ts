import { Module } from '@nestjs/common';
import { ModePaiementsService } from './mode_paiements.service';
import { ModePaiementsController } from './mode_paiements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaiementEmploye } from 'src/paiementEmpoye/enitities/paiementEmploye.entity';
import { ModePaiement } from './entities/mode_paiement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaiementEmploye, ModePaiement])
  ],
  controllers: [ModePaiementsController],
  providers: [ModePaiementsService],
})
export class ModePaiementsModule {}
