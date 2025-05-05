import { Module } from '@nestjs/common';
import { FonctionService } from './fonction.service';
import { FonctionController } from './fonction.controller';

@Module({
  controllers: [FonctionController],
  providers: [FonctionService],
})
export class FonctionModule {}
