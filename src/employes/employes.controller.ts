import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseApi } from 'src/responce.dto';

@ApiTags('Employe')
@Controller('employes')
export class EmployesController {
  constructor(private readonly employesService: EmployesService) {}

  @Post()
  @ApiResponse({status: 201 , description: 'insertion avec succès'})
  @ApiResponse({ status: 403 , description: 'echec'})
  @ApiBody({ type: CreateEmployeDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(@Body() createEmployeDto: CreateEmployeDto) {
    try {
      const nouveauEmployee =  this.employesService.create(createEmployeDto);
      return new ResponseApi('succès','Employée crée avec succès');
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors e la création de l\'employée');
    }
  }

  @Get()
  @ApiResponse({status: 200 , description:'liste des employées'})
  findAll() {
    return this.employesService.findAll();
  }

  @Get(':matricule')
  @ApiResponse({ status: 404 , description: 'Fonction non trouvée'})
  @ApiResponse({status: 200 , description: "selection d'une fonction réussite"})
  findOne(@Param('matricule') matricule: string) {
    return this.employesService.findOne(matricule);
  }

  @Patch(':matricule')
  update(@Param('matricule') matricule: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employesService.update(matricule, updateEmployeDto);
  }
}
