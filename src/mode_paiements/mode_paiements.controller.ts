import { Controller, Get } from '@nestjs/common';
import { ModePaiementsService } from './mode_paiements.service';
import {ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mode Paiements')
@Controller('mode-paiements')
export class ModePaiementsController {
  constructor(private readonly modePaiementsService: ModePaiementsService) {}


  @Get()
  @ApiResponse({status: 200 , description:'liste des mode depaiement'})
  findAll() {
    return this.modePaiementsService.findAll();
  }

  
}
