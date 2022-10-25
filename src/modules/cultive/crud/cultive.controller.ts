import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { paramId } from '@src/utils/dtos/param.id.dto';
import { Created, Ok } from '@src/utils/functions/exceptions.fn';
import { CultiveService } from './cultive.service';
import { CreateCultiveDto } from './dto/create-cultive.dto';
import { UpdateCultiveSampleInformationDto } from './dto/update-cultive-sample-information.dto';
import { UpdateCultiveDto } from './dto/update-cultive.dto';

@Controller({ path: 'cultive' })
export class CultiveController {
  constructor(private readonly cultiveService: CultiveService) {}
 
  @Post()
  async create(@Body() createCultiveDto: CreateCultiveDto) {    
    const result = await this.cultiveService.create(createCultiveDto);

    Created({ id: result?.id });
  }

  @Get()
  async findAll() {
    const result = await this.cultiveService.findAll();

    Ok(result);
  }

  @Get(':id')
  async findOne(@Param() param: paramId) {
    const result = await this.cultiveService.findOne(param.id);

    Ok(result);
  }

  @Put('/sample-information/:id')
  async updateSampleInformation(@Param() param: paramId, @Body() updateCultiveDto: UpdateCultiveSampleInformationDto) {
    await this.cultiveService.updateSampleInformation(param.id, updateCultiveDto);

    Ok();
  }

  @Put(':id')
  async update(@Param() param: paramId, @Body() updateCultiveDto: UpdateCultiveDto) {
    await this.cultiveService.update(param.id, updateCultiveDto);

    Ok();
  }

  @Delete(':id')
  async delete(@Param() param: paramId) {
    await this.cultiveService.delete(param.id);

    Ok();
  }
}
