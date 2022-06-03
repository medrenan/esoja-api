import { Controller, Get, Param } from '@nestjs/common';
import { paramId } from '@src/utils/dtos/param.id.dto';
import { Ok } from '@src/utils/functions/exceptions.fn';
import { ProductivityService } from './productivity.service';

@Controller({ path: 'cultive/productivity', version: '1' })
export class ProductivityController {
  constructor(private readonly productivityService: ProductivityService) {}

  @Get(':id')
  async getAllProcutionAvarege(@Param() param: paramId) {
    const result = await this.productivityService.getAllProcutionAvarege(param.id);

    Ok({ avarege: result });
  }
}
