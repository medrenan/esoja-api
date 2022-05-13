import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { AgritecGetCultivaresByObtentorDto } from './dto/cultivares.by.obtentor.dto';
import { AgritecGetObtentorDto } from './dto/obtentor.dto';
import { AgritecGetProdutividadeDto } from './dto/produtividade.dto';
import { AgritecCultivaresI } from './interface/agritec.cultivares.interface';
import { AgritecProdutividadeI, AgritecResponseProdutividadeI } from './interface/agritec.produtividade.interface';

@Injectable()
export class AgritecService {
  apiToken: string;
  apiUrl = `https://api.cnptia.embrapa.br/agritec/v1/`;
  apiConfig: AxiosRequestConfig = { headers: { accept: 'application/json', Authorization: `Bearer ${process.env.AGRITECH_TOKEN}` } };

  culturaAgritec = { id: 60, cultura: 'SOJA' };

  constructor(private readonly prisma: PrismaService) {}

  async getToken() {
    const apiUrl = `https://api.cnptia.embrapa.br/token`;

    const data = {
      grant_type: {
        username: process.env.AGRITECH_USER,
        password: process.env.AGRITECH_PASS,
      },
    };
  }

  async getObtentores(bodyDto: AgritecGetObtentorDto) {
    const query = `?safra=${bodyDto.safra}&uf=${bodyDto.uf}&idCultura=${this.culturaAgritec.id}`;

    const obtentores: string[] = [];

    const res: AgritecCultivaresI[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log(err.response);

        throw new BadRequestException('Error in search to agritec');
      });

    res.forEach((value) => {
      if (!obtentores.includes(value.obtentorMantenedor)) obtentores.push(value.obtentorMantenedor);
    });

    return obtentores;
  }

  async getCultivaresByObtentor(bodyDto: AgritecGetCultivaresByObtentorDto) {
    const query = `?safra=${bodyDto.safra}&uf=${bodyDto.uf}&idCultura=${this.culturaAgritec.id}&obtentorMantenedor=${bodyDto.obtentorMantenedor}`;

    const cultivares: AgritecCultivaresI[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log(err.response);

        throw new BadRequestException('Error in search to agritec');
      });

    return cultivares;
  }

  async getProdutividade(bodyDto: AgritecGetProdutividadeDto) {
    const capacidadeDeAguaNoSolo = 50; // não temos essa informação
    const expectativaProdutividade = 0; // não temos essa informação ainda, podemos tentar fazer os calculos

    const cultive = await this.prisma.cultive.findUnique({ where: { id: bodyDto.cultiveId }, include: { property: true } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    const query = `?idCultura=${this.culturaAgritec.id}&idCultivar=${bodyDto.idCultivar}&codigoIBGE=${cultive.property.ibgeCode}&dataPlantio=${cultive.plantingDate}&latitude=${cultive.property.latitude}&longitude=${cultive.property.longitude}&cad=${capacidadeDeAguaNoSolo}&expectativaProdutividade=${expectativaProdutividade}`;

    const res: AgritecResponseProdutividadeI = await axios
      .get(this.apiUrl + 'produtividade' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log(err);

        throw new BadRequestException('Error in search to agritec');
      });

    const productivity: AgritecProdutividadeI[] = [];

    for (let i = 0; i < res.balancoHidrico.length; i++) {
      productivity.push({
        balancoHidrico: res.balancoHidrico[i],
        deficienciaHidrica: res.deficienciaHidrica[i],
        excedenteHidrico: res.excedenteHidrico[i],
        grausDia: res.grausDia[i],
        precipitacao: res.precipitacao[i],
        produtividadeAlmejada: res.produtividadeAlmejada[i],
        produtividadeMediaMunicipio: res.produtividadeMediaMunicipio[i],
        temperaturaMaxima: res.temperaturaMaxima[i],
        temperaturaMinima: res.temperaturaMinima[i],
      });
    }

    return productivity;
  }
}
