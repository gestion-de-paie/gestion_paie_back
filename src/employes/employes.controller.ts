import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseApi } from 'src/responce.dto';
import { AssignerPaiementEmployeDto } from 'src/paiementEmpoye/dto/assignerPaiementEmploye.dto';
import { PaiementEmployeService } from 'src/paiementEmpoye/paiementEmploye.service';

@ApiTags('Employe')
@Controller('employes')
export class EmployesController {
  constructor(private readonly employesService: EmployesService,
    private readonly paiementEmploye: PaiementEmployeService 
  ) {}

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
      return new ResponseApi('erreur','Erreur lors de la création de l\'employée');
    }
  }
  employe

  @Post('/assingner')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/x-www-form-urlencoded')
  async  assignerPaiementEmploye(@Body() dto: AssignerPaiementEmployeDto){
    try {
      await this.paiementEmploye.assignerPaiementEmploye(dto);
      return new ResponseApi('succès','Mode de paiement assigener avec succès');
    } catch (error) {
      return new ResponseApi('erreur','Erreur lors de la création de la mode de paiement de l\' employé : '+error.message);
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
