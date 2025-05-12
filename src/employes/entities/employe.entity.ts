import { IsInt } from "class-validator";
import { CasEmploye } from "src/enums/casEmploye.enum";
import { SexEmploye } from "src/enums/sexEmploye.enum";
import { SituationEmploye } from "src/enums/situationEmploye.enum";
import { Fonction } from "src/fonctions/entities/fonction.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Employe {
    @PrimaryColumn()
    matricule: string;

    @Column({
        nullable: false, length: 150
    })
    nom: string;

    @Column({length: 150})
    prenom: string;

    @Column({nullable: false , length: 100})
    adresse: string;

    @Column({nullable: false, length: 15})
    contact: string;

    @Column({nullable: false, length: 150})
    email: string

    @Column({
        type: 'date'
    })
    date_embauche: Date;

    @Column({nullable: false , type: 'date'})
    date_naissance: Date;

    @Column({
        type: "enum",
        enum: SexEmploye
    })
    sex_employe: SexEmploye;

    @Column({
        type: 'enum',
        enum: SituationEmploye
    })
    situation_employe: SituationEmploye;

    @Column({
        type: 'enum',
        enum: CasEmploye,
        default: CasEmploye.ENCOURS
    })
    cas_employer: CasEmploye;
    

    @ManyToOne(()=>Fonction , (fonction)=>fonction.nom_fonction,{
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    })
    fonction: Fonction;

}
