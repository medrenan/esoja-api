import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { AgritecCultivaresDto } from './dto/agritec.cultivares.dto';
import { AgritecResponseProdutividadeDto } from './dto/agritec.produtividade.dto';
import { AgritecGetCultivaresByObtentorDto } from './dto/cultivares.by.obtentor.dto';
import { AgritecGetObtentorDto } from './dto/obtentor.dto';
import { AgritecGetProdutividadeDto } from './dto/produtividade.dto';

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
    const cultive = await this.prisma.cultive.findUnique({ where: { id: bodyDto.cultiveId }, include: { property: true } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    const query = `?safra=${cultive.cropYear}&uf=${cultive.property.state}&idCultura=${this.culturaAgritec.id}`;

    const obtentores: string[] = [];

    const res: AgritecCultivaresDto[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log('getObtentores: ', err?.message);

        throw new BadRequestException('Error in search to agritec');
      });

    res.forEach((value) => {
      if (!obtentores.includes(value.obtentorMantenedor)) obtentores.push(value.obtentorMantenedor);
    });

    return obtentores;
  }

  async getCultivaresByObtentor(bodyDto: AgritecGetCultivaresByObtentorDto) {
    const cultive = await this.prisma.cultive.findUnique({ where: { id: bodyDto.cultiveId }, include: { property: true } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    const query = `?safra=${cultive.cropYear}&uf=${cultive.property.state}&idCultura=${this.culturaAgritec.id}&obtentorMantenedor=${bodyDto.obtentorMantenedor}`;

    const cultivares: AgritecCultivaresDto[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log('getCultivaresByObtentor: ', err?.message);

        throw new BadRequestException('Error in search to agritec');
      });

    const numeroRncs: string[] = [];

    return cultivares.filter((value: AgritecCultivaresDto) => {
      if (!numeroRncs.includes(value.numeroRnc)) {
        numeroRncs.push(value.numeroRnc);

        return value;
      }
    });
  }

  async getProdutividade(bodyDto: AgritecGetProdutividadeDto) {
    const capacidadeDeAguaNoSolo = 50; // não temos essa informação

    const cultive = await this.prisma.cultive.findUnique({
      where: { id: bodyDto.cultiveId },
      select: {
        idCultivar: true,
        plantingDate: true,
        property: true,
        expectedProduction: true,
        cultiveProductionAgritec: true,
      },
    });

    if (!cultive) throw new BadRequestException('Cultive not found');

    if (cultive.cultiveProductionAgritec.length) return plainToClass(AgritecResponseProdutividadeDto, cultive.cultiveProductionAgritec[0].data);

    if (!cultive?.idCultivar) {
      if (!bodyDto.idCultivar) throw new BadRequestException(`This cultive don't have a idCultivar yet`);

      await this.prisma.cultive.update({ where: { id: bodyDto.cultiveId }, data: { idCultivar: bodyDto.idCultivar } });

      cultive.idCultivar = bodyDto.idCultivar;
    }

    const query = `?idCultura=${this.culturaAgritec.id}&idCultivar=${cultive.idCultivar}&codigoIBGE=${cultive.property.ibgeCode}&dataPlantio=${cultive.plantingDate}&latitude=${cultive.property.latitude}&longitude=${cultive.property.longitude}&cad=${capacidadeDeAguaNoSolo}&expectativaProdutividade=${cultive.expectedProduction}`;

    const res: AgritecResponseProdutividadeDto = await axios
      .get(this.apiUrl + 'produtividade' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log('getProdutividade: ', err?.message);

        throw new BadRequestException('Error in search to agritec');
      });

    if (Object.keys(res).length !== 0)
      await this.prisma.cultiveProductionAgritec.create({ data: { data: instanceToPlain(res), cultiveId: bodyDto.cultiveId } });

    return res;
  }
}
