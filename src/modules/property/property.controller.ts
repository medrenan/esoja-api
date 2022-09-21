import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Created, Ok } from '@src/utils/functions/exceptions.fn';
import { paramId } from '@src/utils/dtos/param.id.dto';

@Controller({ path: 'property' })
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    const result = await this.propertyService.create(createPropertyDto);

    Created({ id: result?.id });
  }

  @Get()
  async findAll() {
    const result = await this.propertyService.findAll();

    Ok(result);
  }

  @Get(':id')
  async findOne(@Param() param: paramId) {
    const result = await this.propertyService.findOne(param.id);

    Ok(result);
  }

  @Put(':id')
  async update(@Param() param: paramId, @Body() updatePropertyDto: UpdatePropertyDto) {
    await this.propertyService.update(param.id, updatePropertyDto);

    Ok();
  }

  @Delete(':id')
  async delete(@Param() param: paramId) {
    await this.propertyService.delete(param.id);

    Ok();
  }
}
