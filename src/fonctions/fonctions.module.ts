import { Module } from '@nestjs/common';
import { FonctionsService } from './fonctions.service';
import { FonctionsController } from './fonctions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fonction } from './entities/fonction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fonction])],
  controllers: [FonctionsController],
  providers: [FonctionsService],
})
export class FonctionsModule {}
