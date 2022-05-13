import { IsCropYear } from '@src/utils/decorators/crop.year.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class AgritecGetCultivaresByObtentorDto {
  @IsString()
  @IsCropYear()
  @IsNotEmpty()
  safra: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  obtentorMantenedor: string;
}
