import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaiementEmploye } from "src/paiementEmpoye/enitities/paiementEmploye.entity";
import { OneToMany } from "typeorm";

export class CreateModePaiementDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    libelle: string;

    @OneToMany(()=> PaiementEmploye , (paiementEmploye)=>paiementEmploye.modePaiement)
    paiementEmployes: PaiementEmploye[];

}
