import { PaiementEmploye } from "src/paiementEmpoye/enitities/paiementEmploye.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['libelle'])
export class ModePaiement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false , length: 50})
    libelle: string;

    @OneToMany(()=> PaiementEmploye , (paiementEmploye)=>paiementEmploye.employe)
    paiementEmployes: PaiementEmploye[];
    
}
