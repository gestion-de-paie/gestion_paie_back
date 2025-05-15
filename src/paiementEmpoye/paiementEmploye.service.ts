import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AssignerPaiementEmployeDto } from "./dto/assignerPaiementEmploye.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Employe } from "src/employes/entities/employe.entity";
import { Repository } from "typeorm";
import { ModePaiement } from "src/mode_paiements/entities/mode_paiement.entity";
import { PaiementEmploye } from "./enitities/paiementEmploye.entity";

@Injectable()
export class PaiementEmployeService{
    constructor(
        @InjectRepository(PaiementEmploye)
        private readonly repo: Repository<PaiementEmploye>,
        @InjectRepository(Employe)
        private readonly employeRepo: Repository<Employe>,
        @InjectRepository(ModePaiement)
        private readonly modeRepo: Repository<ModePaiement>
    ){ }
    async assignerPaiementEmploye(dto: AssignerPaiementEmployeDto){
        const employe = await this.employeRepo.findOneBy({matricule: dto.employeMatricule});
        
        const modePaiement = await this.modeRepo.findOneBy({id: dto.modePaiementId});
        
        if(!employe || !modePaiement) throw new NotFoundException('Employée ou mode de paiemenent non trouvée');

        switch (modePaiement.libelle) {
            case "virement":
                if (!dto.iban || !dto.banque) {
                    throw new BadRequestException("IBAN et Banque sont requis pour "+modePaiement.libelle)
                }
                break;
            case "mobile money":
                if (!dto.reseau_mobile || !dto.numero_mobile_money) {
                    throw new BadRequestException("reseau mobile et numéro sont requis pour "+modePaiement.libelle)
                }
                break;
            case "carte bancaire":
                if (!dto.num_compte || !dto.banque ||!dto.date_expiration) {
                    throw new BadRequestException("numéro de compte avec date d'expiration et Banque sont requis pour "+modePaiement.libelle)
                }
                break;
            case "chèque":
                if (!dto.lieu_retrait) {
                    throw new BadRequestException("Lieu de retrait est requis pour "+modePaiement.libelle)
                }
                break;
            default:
                throw new BadRequestException('Mode de paiement inconnu');
        }

        await this.repo.update({
            employe: {matricule: dto.employeMatricule}, actif: true
        }, {
            actif: false
        })
        const nouveau = this.repo.create({
            employe,
            modePaiement,
            numero_mobile_money: dto.numero_mobile_money,
            reseau_mobile: dto.reseau_mobile,
            num_compte: dto.numero_mobile_money,
            date_expire: dto.date_expiration,
            banque: dto.banque,
            iban: dto.iban,
            lieu_retrait: dto.lieu_retrait
        })
        return await this.repo.save(nouveau);
    }
}