import { Module } from '@nestjs/common';
import { AgritecService } from './agritec.service';

@Module({
  providers: [AgritecService],
})
export class AgritecModule {}
