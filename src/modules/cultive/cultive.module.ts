import { Module } from '@nestjs/common';
import { CultiveService } from './cultive.service';
import { CultiveController } from './cultive.controller';

@Module({
  controllers: [CultiveController],
  providers: [CultiveService],
})
export class CultiveModule {}
