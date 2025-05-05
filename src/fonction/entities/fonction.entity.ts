import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fonction {
    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false ,
        length: 100 , 
        unique: true
    })
    nom_fonction: string;

    @Column({
        nullable: false 
    })
    salaire_base: number;

    @Column({
        type: 'enum',
        enum : ['mensuel' , 'horaire'],
        default: 'mensuel'
    })
    type_contrat: 'mensuel'|'horaire';
}
