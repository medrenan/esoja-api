import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class AgritecGetProdutividadeDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;

  @IsNumber()
  @IsNotEmpty()
  idCultivar: number;
}
