import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AgritecGetCultivaresByObtentorDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;

  @IsString()
  @IsNotEmpty()
  obtentorMantenedor: string;
}
