import { Expose, Type } from 'class-transformer';
import { ImeaDto } from './imea.dto';

export class ImeaMainPageRedisDto {
  @Expose()
  @Type(() => ImeaDto)
  availableSoybeanPack: ImeaDto;

  @Expose()
  @Type(() => ImeaDto)
  conventionalSeed: ImeaDto;
}
