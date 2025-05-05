import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TypeContrat } from "src/enums/typeContrat.enum";

export class CreateFonctionDto {
    @ApiProperty({
        type: String,
        description: 'nom de la fonction',
        example: 'Directeur générale',
        required: true
    })
    @IsNotEmpty({message: 'Le nom de la fonction est requis'})
    @IsString({ message:'Le nom de la fonction devras une chaîne de caractère' })
    nom_fonction: string;

    @ApiProperty({
        type: Number,
        description: 'salaire de base de la fonction',
        example: 40000,
        required: true
    })
    @IsNotEmpty({message:"Le salaire de base est requis"})
    @IsNumber({}, { message: 'Le salaire de base doit être un nombre.' })
    @Type(()=> Number)
    salaire_base: number

    @ApiProperty({
        enum: TypeContrat ,
        description: 'typede contrat'
    })
    @IsNotEmpty({message:'Le type de contrat est requis'})
    @IsEnum(TypeContrat,{message: 'Le type de contrat doit être une valeur valide(CDI ou CDD ou STAGE)'})
    type_contrat: TypeContrat;
}
