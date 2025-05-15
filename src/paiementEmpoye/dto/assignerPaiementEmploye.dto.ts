import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AssignerPaiementEmployeDto{
    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(()=>Number)
    modePaiementId: number

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    employeMatricule: string;

    @ApiProperty({
        type: Boolean,
    })
    @IsBoolean()
    @Type(()=>Boolean)
    actif: boolean;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsOptional()
    numero_mobile_money: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsOptional()
    reseau_mobile: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsOptional()
    banque: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsOptional()
    num_compte: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsOptional()
    iban: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsOptional()
    lieu_retrait: string;

    @ApiProperty({
        description: 'Date d\'expiration (YYYY-MM)'
    })
    @IsString()
    @IsOptional()
    date_expiration: Date

    
}