import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModePaiementsService } from './mode_paiements.service';
import { CreateModePaiementDto } from './dto/create-mode_paiement.dto';
import { UpdateModePaiementDto } from './dto/update-mode_paiement.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseApi } from 'src/responce.dto';

@ApiTags('Mode Paiements')
@Controller('mode-paiements')
export class ModePaiementsController {
  constructor(private readonly modePaiementsService: ModePaiementsService) {}

  @Post()
  @ApiResponse({status:201 , description: 'insertion avec succès'})
  @ApiResponse({ status: 403 , description: 'echec'})
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() createModePaiementDto: CreateModePaiementDto) {
    try {
      const nouvelleMode = this.modePaiementsService.create(createModePaiementDto);

      return new ResponseApi('succès','Mode de paiement créée avec succès')
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de création d\'une mode de paiement : '+ error.message);
    }
     
  }

  @Get()
  @ApiResponse({status: 200 , description:'liste des mode depaiement'})
  findAll() {
    return this.modePaiementsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404 , description: 'Mode de paiement non trouvée'})
  @ApiResponse({status: 200 , description: "selection d'une mode de paiement réussite"})
  findOne(@Param('id') id: string) {
    return this.modePaiementsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 404 , description: 'Mode de paiement non trouvée'})
  @ApiResponse({status: 200 , description: "Mis à jours de la mode de paiement avec succès"})
  @ApiBody({ type: UpdateModePaiementDto })
  update(@Param('id') id: string, @Body() updateModePaiementDto: UpdateModePaiementDto) {
    try {
      const ModeModifier = this.modePaiementsService.update(+id, updateModePaiementDto);
      return  new ResponseApi('succès','Mode de paiement modifié avec succès')
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de modification de la  mode de paiement : '+ error.message);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 404 , description: 'Mode de paiement non trouvée'})
  @ApiResponse({status: 200 , description: "Suppresion d\'une mode de paiement avec succès"})
  remove(@Param('id') id: string) {
    try {
      const modeSupprimer = this.modePaiementsService.remove(+id);
      return  new ResponseApi('succès','Mode de paiement supprimé avec succès')
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de suppression de la  mode de paiement : '+ error.message);
    }
  }
}
