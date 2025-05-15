import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { ModePaiement } from './entities/mode_paiement.entity';

@Injectable()
export class ModePaiementsService {
  constructor(
    @InjectRepository(ModePaiement)
    private readonly modePaiementRepository: Repository<ModePaiement>
  ){}
  

  async findAll() {
    return await this.modePaiementRepository.find();
  }

  
}
