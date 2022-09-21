import { Body, Controller, Post } from '@nestjs/common';
import { Ok } from '@src/utils/functions/exceptions.fn';
import { AgritecService } from './agritec.service';
import { AgritecGetCultivaresByObtentorDto } from './dto/cultivares.by.obtentor.dto';
import { AgritecGetObtentorDto } from './dto/obtentor.dto';
import { AgritecGetProdutividadeDto } from './dto/produtividade.dto';

@Controller({ path: 'agritec' })
export class AgritecController {
  constructor(private readonly agritecService: AgritecService) {}

  @Post('/obtentores')
  async getObtentores(@Body() body: AgritecGetObtentorDto) {
    const result = await this.agritecService.getObtentores(body);

    Ok(result);
  }

  @Post('/cultivares')
  async getCultivaresByObtentor(@Body() body: AgritecGetCultivaresByObtentorDto) {
    const result = await this.agritecService.getCultivaresByObtentor(body);

    Ok(result);
  }

  @Post('/produtividade')
  async getProdutividade(@Body() body: AgritecGetProdutividadeDto) {
    const result = await this.agritecService.getProdutividade(body);

    Ok(result);
  }
}
