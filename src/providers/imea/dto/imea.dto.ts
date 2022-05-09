import { Expose } from 'class-transformer';

export class ImeaDto {
  @Expose()
  Localidade: string;

  @Expose()
  Variacao: number;

  @Expose()
  Safra: string;

  @Expose()
  IndicadorFinalId: string;

  @Expose()
  CadeiaId: string;

  @Expose()
  DataPublicacao: string;

  @Expose()
  TipoLocalidadeId: string;

  @Expose()
  UnidadeSigla: string;

  @Expose()
  UnidadeDescricao: string;
}
