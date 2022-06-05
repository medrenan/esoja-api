import { Expose } from 'class-transformer';

export class AgritecResponseProdutividadeDto {
  @Expose()
  produtividadeAlmejada: number[];
  @Expose()
  produtividadeMediaMunicipio: number[];
  @Expose()
  temperaturaMinima: number[];
  @Expose()
  temperaturaMaxima: number[];
  @Expose()
  precipitacao: number[];
  @Expose()
  grausDia: number[];
  @Expose()
  balancoHidrico: number[];
  @Expose()
  deficienciaHidrica: number[];
  @Expose()
  excedenteHidrico: number[];
}

export class AgritecProdutividadeDto {
  @Expose()
  produtividadeAlmejada: number;
  @Expose()
  produtividadeMediaMunicipio: number;
  @Expose()
  temperaturaMinima: number;
  @Expose()
  temperaturaMaxima: number;
  @Expose()
  precipitacao: number;
  @Expose()
  grausDia: number;
  @Expose()
  balancoHidrico: number;
  @Expose()
  deficienciaHidrica: number;
  @Expose()
  excedenteHidrico: number;
}
