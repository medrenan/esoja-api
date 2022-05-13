import { IsCropYear } from '@src/utils/decorators/crop.year.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class AgritecGetObtentorDto {
  @IsString()
  @IsCropYear()
  @IsNotEmpty()
  safra: string;

  @IsString()
  @IsNotEmpty()
  uf: string;
}
