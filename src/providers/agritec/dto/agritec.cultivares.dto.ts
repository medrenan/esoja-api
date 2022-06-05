import { Expose } from 'class-transformer';

export class AgritecCultivaresDto {
  @Expose()
  idCultivar: number;
  @Expose()
  idCultura: number;
  @Expose()
  safra: string;
  @Expose()
  numeroRnc: string;
  @Expose()
  obtentorMantenedor: string;
  @Expose()
  cultivar: string;
  @Expose()
  cultura: string;
  @Expose()
  potencialProdutivo: number;
  @Expose()
  duracaoCiclo: number;
  @Expose()
  uf: string;
  @Expose()
  grupo: string;
  @Expose()
  maturacaoFisiologica: number;
  @Expose()
  floracao: number;
  @Expose()
  dataAtualizacao: string;
  @Expose()
  regiao: string;
  @Expose()
  grupoBioClimatico: string;
}
