import { Module } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { EmployesController } from './employes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fonction } from 'src/fonctions/entities/fonction.entity';
import { Employe } from './entities/employe.entity';
import { PaiementEmploye } from 'src/paiementEmpoye/enitities/paiementEmploye.entity';
import { PaiementEmployeService } from 'src/paiementEmpoye/paiementEmploye.service';
import { ModePaiement } from 'src/mode_paiements/entities/mode_paiement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fonction,Employe,PaiementEmploye,ModePaiement])
  ],
  controllers: [EmployesController],
  providers: [EmployesService,PaiementEmployeService],
})
export class EmployesModule {}
