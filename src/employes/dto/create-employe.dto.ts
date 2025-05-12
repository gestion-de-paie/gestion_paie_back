import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CasEmploye } from "src/enums/casEmploye.enum";
import { SexEmploye } from "src/enums/sexEmploye.enum";
import { SituationEmploye } from "src/enums/situationEmploye.enum";

export class CreateEmployeDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty({message: 'Le nom de l\'employée est requis'})
    @IsString({message: 'Le nom doit être une chaine de caractère'})
    nom: string;

    @IsString({message: 'Le prénom doit être une chaine de caractère'})
    @ApiProperty({
        type: String,
    })
    prenom: string;

    @IsNotEmpty({message: 'L\'adresse de de l\'employée est requis'})
    @IsString({message: 'L\'adresse doit être une chaine de caractère'})
    @ApiProperty({
        type: String,
    })
    adresse: string;

    @IsNotEmpty({message: 'Le contact de l\'employée est requis'})
    @IsString({message: 'Le contact doit être une chaine de caractère'})
    @ApiProperty({
        type: String,
    })
    contact: string;

    @IsNotEmpty({message: 'L\'email de l\'employée est requis'})
    @IsString({message: 'L\'email doit être une chaine de caractère'})
    @ApiProperty({
        type: String,
    })
    email: string;

    @IsNotEmpty({message: 'La date embauche est requis'})
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Date d\'embauche (YYYY-MM-DD)'
    })
    date_embauche: Date

    @IsNotEmpty({message: 'La date de naissance de l\'employée est requis'})
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Date de naissance (YYYY-MM-DD)'
    })
    date_naissance: Date;

    @IsNotEmpty({message: 'Le sex de l\'employée est requis'})
    @IsEnum(SexEmploye, {message: 'Le sex  doit être une valeur valide'})
    @ApiProperty({
        enum: SexEmploye,
    })
    sex_employe: SexEmploye;

    @IsNotEmpty({message: 'La situation de l\'employée est requis'})
    @IsEnum(SituationEmploye, {message: 'La situation de l\'employer doit être une chaine de caractère valide'})
    @ApiProperty({
        enum: SituationEmploye,
    })
    situation_employe: SituationEmploye;

    @IsEnum(CasEmploye, {message: 'Le Cas de l\'employer doit être une chaine de caractère valide'})
    @ApiProperty({
        enum: CasEmploye,
    })
    @IsOptional()
    cas_employe: CasEmploye;

    @IsNotEmpty({message: 'Le fonction de l\'employée est requis'})
    @IsNumber({},{message: 'La fonction dôit être existe'})
    @Type(()=>Number)
    @ApiProperty({
        type: Number,
    })
    fonctionId: number;
}
