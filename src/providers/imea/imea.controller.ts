import { Controller, Get } from '@nestjs/common';
import { Ok } from '@src/utils/functions/exceptions.fn';
import { ImeaService } from './imea.service';

@Controller({ path: 'imea' })
export class ImeaController {
  constructor(private readonly imeaService: ImeaService) {}

  @Get('main')
  async getMainData() {
    const result = await this.imeaService.getDataMain();

    Ok(result);
  }

  @Get('dashboard')
  async getDashboardData() {
    const result = await this.imeaService.getDashboardData();

    Ok(result);
  }
}
