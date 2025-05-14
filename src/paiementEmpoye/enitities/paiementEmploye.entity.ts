import { Employe } from "src/employes/entities/employe.entity";
import { ModePaiement } from "src/mode_paiements/entities/mode_paiement.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaiementEmploye{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Employe , (employe)=>employe.paiementEmployes)
    employe: Employe

    @ManyToOne(()=>ModePaiement , (modePaiement)=>modePaiement.paiementEmployes)
    modePaiement: ModePaiement;

    @Column({default: true})
    actif: boolean;

    @Column({
        type: 'json',
        nullable: true
    })
    details: Record<string, any>

}