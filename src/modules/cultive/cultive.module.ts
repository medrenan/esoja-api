import { Module } from '@nestjs/common';
import { CultiveService } from './crud/cultive.service';
import { CultiveController } from './crud/cultive.controller';
import { ProductivityModule } from './productivity/productivity.module';

@Module({
  controllers: [CultiveController],
  providers: [CultiveService],
  imports: [ProductivityModule],
})
export class CultiveModule {}
