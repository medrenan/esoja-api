import { Module } from '@nestjs/common';
import { ImeaService } from './imea.service';
import { ImeaController } from './imea.controller';

@Module({
  controllers: [ImeaController],
  providers: [ImeaService],
})
export class ImeaModule {}
