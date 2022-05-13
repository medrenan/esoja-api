import { Module } from '@nestjs/common';
import { AgritecController } from './agritec.controller';
import { AgritecService } from './agritec.service';

@Module({
  controllers: [AgritecController],
  providers: [AgritecService],
})
export class AgritecModule {}
