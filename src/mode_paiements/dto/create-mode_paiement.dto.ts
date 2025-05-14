import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateModePaiementDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    libelle: string;
}
