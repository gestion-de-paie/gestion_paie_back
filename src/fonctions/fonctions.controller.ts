import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FonctionsService } from './fonctions.service';
import { CreateFonctionDto } from './dto/create-fonction.dto';
import { UpdateFonctionDto } from './dto/update-fonction.dto';
import { ResponseApi } from 'src/responce.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Fonction')
@Controller('fonctions')
export class FonctionsController {
  constructor(private readonly fonctionsService: FonctionsService) {}

  @Post()
  @ApiResponse({status: 201 , description: 'insertion avec succès'})
  @ApiResponse({ status: 403 , description: 'echec'})
  @ApiBody({ type: CreateFonctionDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(@Body() createFonctionDto: CreateFonctionDto) {
    try {
      const nouvelleFonction = await this.fonctionsService.create(createFonctionDto);
      return new ResponseApi('succès','Fonction créée avec succès')
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de la création de la fonction : ' + error.message);
    }

  }

  @Get()
  @ApiResponse({status: 200 , description:'liste des fonction'})
  findAll() {
    return this.fonctionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404 , description: 'Fonction non trouvée'})
  @ApiResponse({status: 200 , description: "selection d'une fonction réussite"})
  findOne(@Param('id') id: string) {
    return this.fonctionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 404 , description: 'Fonction non trouvée'})
  @ApiResponse({status: 200 , description: "Mis à jours de la fonction avec succès"})
  @ApiBody({ type: UpdateFonctionDto })
  update(@Param('id') id: string, @Body() updateFonctionDto: UpdateFonctionDto) {
    try {
      const employeMofifier =  this.fonctionsService.update(+id, updateFonctionDto);
      return new ResponseApi('succès','Fonction modifié avec succès')
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de la modification de la fonction : ' + error.message);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 404 , description: 'Fonction non trouvée'})
  @ApiResponse({status: 200 , description: "Suppresion de fonction avec succès"})
  remove(@Param('id') id: string) {
    try {
      const employeSupprimer =  this.fonctionsService.remove(+id);
      return new ResponseApi('succès','Fonction supprmé avec succès')
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de la suppression de la fonction : ' + error.message);
    }
  }
}
