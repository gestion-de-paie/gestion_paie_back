import { PartialType } from '@nestjs/swagger';
import { CreateModePaiementDto } from './create-mode_paiement.dto';

export class UpdateModePaiementDto extends PartialType(CreateModePaiementDto) {}
