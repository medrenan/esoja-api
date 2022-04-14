import { Module } from '@nestjs/common';
import { AgritechService } from './agritech.service';

@Module({
  providers: [AgritechService],
})
export class AgritechModule {}
