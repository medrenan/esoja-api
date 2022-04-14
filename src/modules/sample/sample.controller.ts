import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SampleService } from './sample.service';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { paramId } from '@src/utils/dtos/param.id.dto';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Created, Ok } from '@src/utils/functions/exceptions.fn';

@Controller({ path: 'sample', version: '1' })
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async create(@Body() createSampleDto: CreateSampleDto) {
    const result = await this.sampleService.create(createSampleDto);

    Created({ id: result.id });
  }

  @Get()
  async findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param: paramId) {
    return this.sampleService.findOne(param.id);
  }

  @Put(':id')
  async update(@Param() param: paramId, @Body() updateSampleDto: UpdateSampleDto) {
    await this.sampleService.update(param.id, updateSampleDto);

    Ok();
  }
}
