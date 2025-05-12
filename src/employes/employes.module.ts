import { Module } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { EmployesController } from './employes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fonction } from 'src/fonctions/entities/fonction.entity';
import { Employe } from './entities/employe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fonction,Employe])
  ],
  controllers: [EmployesController],
  providers: [EmployesService],
})
export class EmployesModule {}
