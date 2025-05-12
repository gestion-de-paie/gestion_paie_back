import { Employe } from "src/employes/entities/employe.entity";
import { TypeContrat } from "src/enums/typeContrat.enum";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['nom_fonction'])
export class Fonction {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false , unique:true , length: 100})
    nom_fonction: string;

    @Column({ nullable: false , unsigned: true})
    salaire_base: number;

    @Column({ nullable: false , type: 'enum' , enum: TypeContrat , default: TypeContrat.CDI})
    type_contrat: TypeContrat;

    @OneToMany(()=>Employe , (employe)=>employe.fonction)
    employes: Employe[]; 
}

