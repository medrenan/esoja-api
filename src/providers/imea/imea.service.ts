import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import defaultPlainToClass from '@src/utils/functions/default.plain.to.class.fn';
import axios from 'axios';
import { instanceToPlain } from 'class-transformer';
import { CacheService } from '../cache/cache.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImeaDto } from './dto/imea.dto';
import { ImeaMainPageRedisDto } from './dto/imea.main.page.redis.dto';

@Injectable()
export class ImeaService {
  constructor(private readonly cache: CacheService, private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async getDataMain() {
    const imeaRedis = await this.cache.get('imeaMainPage');

    if (!imeaRedis) {
      const imeaApi = await this.setDataMain();

      if (!imeaApi) {
        const imeaLogs = await this.prisma.imeaLogs.findFirst({ where: { type: 'main' }, orderBy: { createdAt: 'desc' } });

        const imeaLogsData = defaultPlainToClass(ImeaMainPageRedisDto, imeaLogs.data);

        await this.cache.set('imeaMainPage', imeaLogsData, { ttl: 3600 * 5 });

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

      await this.cache.set('imeaMainPage', imeaMainPageData);

      await this.prisma.imeaLogs.create({ data: { data: instanceToPlain(imeaMainPageData), type: 'main' } });

      return imeaMainPageData;
    } catch (err) {
      console.log(err);
    }
  }

  async getImea() {
    const imeaUrl = `https://api1.imea.com.br/api/v2/mobile/cadeias/4/cotacoes`;

    const { data } = await axios.get<ImeaDto[]>(imeaUrl);

    return data;
  }
}
