import { Body, Controller, Get, Param, Post, Delete, Put} from '@nestjs/common';
import { SampleService } from './sample.service';
import { paramId } from '@src/utils/dtos/param.id.dto';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Created } from '@src/utils/functions/exceptions.fn';

@Controller({ path: 'sample' })
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async create(@Body() createSampleDto: CreateSampleDto) {
    const result = await this.sampleService.create(createSampleDto);

    Created(result);
  }
 
  @Get()
  async findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param: paramId) {
    return this.sampleService.findOne(param.id);
  }

  @Delete(':id')
  async delete(@Param() param: paramId) {
    await this.sampleService.delete(param.id);
  }
}
