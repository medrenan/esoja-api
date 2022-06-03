import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class AgritecGetProdutividadeDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  idCultivar: number;
}
