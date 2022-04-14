import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Querybuilder } from 'nestjs-prisma-querybuilder';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuerybuilderService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly querybuilder: Querybuilder,
    private readonly prisma: PrismaService,
  ) {}

  async query(model: string) {
    return this.querybuilder
      .query()
      .then(async (query) => {
        const count = await this.prisma[model].count({ where: query.where });

        this.request.res.setHeader('count', count);

        return query;
      })
      .catch((err) => {
        if (err.response?.message) throw new BadRequestException(err.response?.message);

        throw new BadRequestException('Internal error processing your query string, check your parameters');
      });
  }
}
