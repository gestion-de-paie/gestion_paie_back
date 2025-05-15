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

    @Column({nullable: true})
    numero_mobile_money: string;

    @Column({nullable: true})
    reseau_mobile: string;

    @Column({nullable: true})
    iban: string;
    
    @Column({nullable: true})
    banque: string;

    @Column({nullable: true})
    num_compte: string;

    @Column({nullable: true})
    lieu_retrait: string;


    @Column({
        nullable: true,
        type: 'date'
    })
    date_expire: Date


}