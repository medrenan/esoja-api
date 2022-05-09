import { Module } from '@nestjs/common';
import { CultiveService } from './crud/cultive.service';
import { CultiveController } from './crud/cultive.controller';

@Module({
  controllers: [CultiveController],
  providers: [CultiveService],
  imports: [],
})
export class CultiveModule {}
