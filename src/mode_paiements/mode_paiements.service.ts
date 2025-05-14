import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModePaiementDto } from './dto/create-mode_paiement.dto';
import { UpdateModePaiementDto } from './dto/update-mode_paiement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ModePaiement } from './entities/mode_paiement.entity';

@Injectable()
export class ModePaiementsService {
  constructor(
    @InjectRepository(ModePaiement)
    private readonly modePaiementRepository: Repository<ModePaiement>
  ){}
  async create(createModePaiementDto: CreateModePaiementDto) {
    const {libelle} = createModePaiementDto;

    const existe = await this.modePaiementRepository.findOne({where: {libelle}});

    if (existe) {
      throw new ConflictException('Cette libéllé existe déjà.');
    }


    const nouvelleMode = this.modePaiementRepository.create(createModePaiementDto)

    return this.modePaiementRepository.save(nouvelleMode);
  }

  async findAll() {
    return await this.modePaiementRepository.find();
  }

  async findOne(id: number) {
    const mode = await this.modePaiementRepository.findOneBy({id});
    if (!mode) {
      throw new HttpException('Mode de paiement non trouvée', 404);
    }
    return mode;
  }

  async update(id: number, updateModePaiementDto: UpdateModePaiementDto) {
    const mode = await this.modePaiementRepository.findOneBy({id});
    if (!mode) {
      throw new HttpException('Mode de paiement non trouvée', 404);
    }
    if (updateModePaiementDto.libelle) {
      const modeMemeNom = await this.modePaiementRepository.findOneBy({
        libelle: updateModePaiementDto.libelle,
        id: Not(id)
      })
      if (modeMemeNom) {
        throw new ConflictException('Ce libéllé existe déjà.')
      }
    }

    const nouvelleMode = this.modePaiementRepository.merge(mode,updateModePaiementDto);

    return await this.modePaiementRepository.save(nouvelleMode);
  }

  async remove(id: number) {
    const mode = await this.modePaiementRepository.findOneBy({id});
    if (!mode) {
      throw new NotFoundException('Mode de paiement non trouvée');
    }

    return await this.modePaiementRepository.remove(mode);
  }
}
