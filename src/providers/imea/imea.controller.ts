import { Controller, Get } from '@nestjs/common';
import { Ok } from '@src/utils/functions/exceptions.fn';
import { ImeaService } from './imea.service';

@Controller({ path: 'imea', version: '1' })
export class ImeaController {
  constructor(private readonly imeaService: ImeaService) {}

  @Get('main')
  async getMainData() {
    const result = await this.imeaService.getDataMain();

    Ok(result);
  }
}
