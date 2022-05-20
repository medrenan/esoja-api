import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import defaultPlainToClass from '@src/utils/functions/default.plain.to.class.fn';
import axios from 'axios';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { CacheService } from '../cache/cache.service';
import { PrismaService } from '../prisma/prisma.service';
import { QuerybuilderService } from '../prisma/querybuilder/querybuilder.service';
import { ImeaDto } from './dto/imea.dto';
import { ImeaMainPageRedisDto } from './dto/imea.main.page.redis.dto';

@Injectable()
export class ImeaService {
  constructor(private readonly cache: CacheService, private readonly prisma: PrismaService, private readonly qb: QuerybuilderService) {}

  async getDashboardData() {
    const { available, seed } = await this.getAvailableAndSeeds(10);

    return this.mapAvailableAndSeeds(available, seed);
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async getDataMain() {
    const imeaRedis = await this.cache.get('imeaMainPage');

    if (!imeaRedis) {
      const imeaApi = await this.setDataMain();

      if (!imeaApi) {
        const { available, seed } = await this.getAvailableAndSeeds(1);

        const imeaLogsData = defaultPlainToClass(ImeaMainPageRedisDto, { availableSoybeanPack: available[0], conventionalSeed: seed[0] });

        await this.cache.set('imeaMainPage', imeaLogsData, { ttl: 3600 * 24 });

        return imeaLogsData;
      }

      return imeaApi;
    }

    return imeaRedis;
  }

  async setDataMain() {
    try {
      const imeaData = await this.getImea();

      if (!imeaData.length) return;

      const avaibleId = '708192508838936580';
      const conventionalId = '3';

      const availableSoybeanPack = imeaData.find((quotation) => quotation.IndicadorFinalId === avaibleId && quotation.Localidade === 'Mato Grosso');

      const conventionalSeed = imeaData.find((quotation) => quotation.IndicadorFinalId === conventionalId && quotation.Localidade === 'Convencional');

      const imeaMainPageData = defaultPlainToClass(ImeaMainPageRedisDto, { availableSoybeanPack, conventionalSeed });

      await this.cache.set('imeaMainPage', imeaMainPageData, { ttl: 3600 * 24 });

      await this.checkIfSeedChangesAndSave(conventionalSeed);
      await this.checkIfAvailableChangesAndSave(availableSoybeanPack);

      return imeaMainPageData;
    } catch (err) {
      console.log(err);
    }
  }

  async checkIfAvailableChangesAndSave(availableSoybeanPack: ImeaDto) {
    const available = await this.prisma.imeaLogs.findFirst({ where: { type: 'availableSoybeanPack' }, orderBy: { createdAt: 'desc' } });

    const availableData = plainToClass(ImeaDto, available?.data);

    if (!available || availableData.Valor !== availableSoybeanPack.Valor || availableData.DataPublicacao !== availableSoybeanPack.DataPublicacao) {
      await this.prisma.imeaLogs.create({ data: { data: instanceToPlain(availableSoybeanPack), type: 'availableSoybeanPack' } });
    }
  }

  async checkIfSeedChangesAndSave(conventionalSeed: ImeaDto) {
    const seed = await this.prisma.imeaLogs.findFirst({ where: { type: 'conventionalSeed' }, orderBy: { createdAt: 'desc' } });

    const seedData = plainToClass(ImeaDto, seed?.data);

    if (!seed || seedData.Valor !== conventionalSeed.Valor || seedData.DataPublicacao !== conventionalSeed.DataPublicacao) {
      await this.prisma.imeaLogs.create({ data: { data: instanceToPlain(conventionalSeed), type: 'conventionalSeed' } });
    }
  }

  async getAvailableAndSeeds(limit: number) {
    const available = await this.prisma.imeaLogs
      .findMany({
        where: { type: 'availableSoybeanPack' },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
      .then((res) => res.map((v) => plainToClass(ImeaDto, v.data)));

    const seed = await this.prisma.imeaLogs
      .findMany({
        where: { type: 'conventionalSeed' },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
      .then((res) => res.map((v) => plainToClass(ImeaDto, v.data)));

    return { available, seed };
  }

  mapAvailableAndSeeds(available: ImeaDto[], seed: ImeaDto[]) {
    return available.map((_, index) => ({
      availableSoybeanPack: available[index],
      conventionalSeed: seed[index],
    }));
  }

  async getImea() {
    const imeaUrl = `https://api1.imea.com.br/api/v2/mobile/cadeias/4/cotacoes`;

    const { data } = await axios.get<ImeaDto[]>(imeaUrl);

    return data;
  }
}
