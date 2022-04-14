import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { QuerybuilderService } from '@src/providers/prisma/querybuilder/querybuilder.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';

@Injectable()
export class SampleService {
  constructor(private readonly prisma: PrismaService, private readonly qb: QuerybuilderService) {}

  async create(createDto: CreateSampleDto) {
    const cultive = await this.prisma.cultive.findUnique({ where: { id: createDto.cultiveId }, include: { samples: true } });

    if (!cultive) throw new BadRequestException('Cultive not found');

    if (cultive.samples.length >= 3) throw new BadRequestException('This cultive already has 3 samples');

    const sample = await this.prisma.cultiveSamples.create({ data: createDto });

    return sample;
  }

  async findAll() {
    const query = await this.qb.query('sample');

    return this.prisma.cultiveSamples.findMany(query).catch(() => {
      throw new BadRequestException('Error on proccess your query, please check your parameters');
    });
  }

  async findOne(id: string) {
    const sample = await this.prisma.cultiveSamples.findUnique({ where: { id: id } });

    if (!sample) throw new BadRequestException('Sample not found');

    return sample;
  }

  async update(id: string, updateDto: UpdateSampleDto) {
    const sample = await this.prisma.cultiveSamples.findUnique({ where: { id: id } });

    if (!sample) throw new BadRequestException('Sample not found');

    await this.prisma.cultiveSamples.update({ where: { id: id }, data: updateDto });
  }
}
