import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFonctionDto } from './dto/create-fonction.dto';
import { UpdateFonctionDto } from './dto/update-fonction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fonction } from './entities/fonction.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class FonctionsService {
  constructor(
    @InjectRepository(Fonction)
    private readonly fonctionRepository: Repository<Fonction>
  ){}
  async create(createFonctionDto: CreateFonctionDto): Promise<Fonction> {
    const { nom_fonction } = createFonctionDto;

    const existe = await this.fonctionRepository.findOne({ where : {nom_fonction }})

    if (existe) {
      throw new ConflictException('Ce nom de fonction existe déjà.');
    }
    const nouvelleFonction =  this.fonctionRepository.create(createFonctionDto)
    
    return this.fonctionRepository.save(nouvelleFonction);
  }

  async findAll(): Promise<Fonction[]> {
    return await this.fonctionRepository.find();
  }

  async findOne(id: number) : Promise<Fonction> {
    const fonction = await this.fonctionRepository.findOneBy({id});
    if (!fonction) {
      throw new HttpException('Fonction non trouvée', 404);
    }
    return fonction;
  }

  async update(id: number, updateFonctionDto: UpdateFonctionDto) : Promise<Fonction>{
    const ancienValeur = await this.fonctionRepository.findOneBy({id});
    if (!ancienValeur) {
      throw new NotFoundException('fonction non trouvée')
    }
    if (updateFonctionDto.nom_fonction) {
      const fonctionMemeNom = await this.fonctionRepository.findOneBy({
        nom_fonction: updateFonctionDto.nom_fonction,
        id: Not(id)
      });

      if (fonctionMemeNom) {
        throw new ConflictException('Ce nom de fonction existe déjà.')
      }
    }
    const nouvelleValeur = this.fonctionRepository.merge(ancienValeur , updateFonctionDto);

    return await this.fonctionRepository.save(nouvelleValeur);
  }

  async remove(id: number): Promise<Fonction> {
    const fonctionExistante = await this.fonctionRepository.findOneBy({id});
    if (!fonctionExistante) {
      throw new NotFoundException('Fonction non trouvée');
    }
    return await this.fonctionRepository.remove(fonctionExistante);
  }
}
