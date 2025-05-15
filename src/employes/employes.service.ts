import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employe } from './entities/employe.entity';
import { Equal, Repository } from 'typeorm';
import { Fonction } from 'src/fonctions/entities/fonction.entity';

@Injectable()
export class EmployesService {
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepository: Repository<Employe>,
    @InjectRepository(Fonction)
    private readonly fonctionRepository: Repository<Fonction>
  ){}

  private calculeAgeEmploye(date_naissance: Date){
    const aujourdhui = new Date();
    const dateNaissance =   new Date(date_naissance);

    let age = aujourdhui.getFullYear() - dateNaissance.getFullYear();
    const MoisDifferent = aujourdhui.getMonth() - dateNaissance.getMonth();

    if ((MoisDifferent < 0) || (MoisDifferent === 0 && aujourdhui.getDate() < dateNaissance.getDate())) {
      age--;
    }

    return age;
  }

  async generateMatricule(){
    const dernierEmploye = await this.employeRepository.findOne({
      where: {},
      order : {matricule: 'DESC'}
    });

    let nouveauMat = 1;
    if(dernierEmploye?.matricule){
      const dernierMat = parseInt(dernierEmploye.matricule.split('-')[1],10);
      nouveauMat = dernierMat + 1;
    }
    const nouveauMatEmploye = `M-${nouveauMat.toString().padStart(4,'0')}`;
    return nouveauMatEmploye;
  }

  async create(createEmployeDto: CreateEmployeDto): Promise<Employe> {
    const fonction = await this.fonctionRepository.findOne({where :  {id: createEmployeDto.fonctionId}})
    
    if (!fonction) {
      throw new NotFoundException('Fonction non trouvée');
    }
    const matricule = await this.generateMatricule();
    const employe = this.employeRepository.create({
      matricule,
      nom: createEmployeDto.nom,
      prenom: createEmployeDto.prenom,
      adresse: createEmployeDto.adresse,
      contact: createEmployeDto.contact,
      email: createEmployeDto.email,
      sex_employe: createEmployeDto.sex_employe,
      situation_employe: createEmployeDto.situation_employe,
      date_embauche: new Date(createEmployeDto.date_embauche),
      date_naissance: new Date(createEmployeDto.date_naissance),
      fonction

    } as Employe);

      return this.employeRepository.save(employe);


  }

  async findAll(): Promise<Employe[]> {
    return await this.employeRepository.find({relations: ['fonction','paiementEmployes','paiementEmployes.modePaiement']});
  }

  async findOne(matricule: string): Promise<Employe> {
    const employe = await this.employeRepository.findOne({
      relations : ['fonction','paiementEmployes','paiementEmployes.modePaiement'],
      where: {matricule,paiementEmployes: { actif: Equal(true)}}
    });
    
    if(!employe){
      throw new HttpException('Employée non trouvée',404);
    }
    return employe
  }

  async update(matricule: string,updateEmployeDto: UpdateEmployeDto) {
    const fonction = await this.fonctionRepository.findOne({where: {id: updateEmployeDto.fonctionId}});
    if (!fonction) {
      throw new NotFoundException('Cette fonction n\'existe pas');
    }
    const employe = await this.employeRepository.findOne({
      where : {matricule},
    });
    if(!employe){
      throw new HttpException('Employée non trouvée',404);
    }
     
    employe.fonction = fonction;

    return this.employeRepository.save(employe);

  }
}
