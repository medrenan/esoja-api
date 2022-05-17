import { Controller, Get } from '@nestjs/common';
import { Ok } from '@src/utils/functions/exceptions.fn';
import { CacheService } from './cache.service';

@Controller({ path: 'admin/cache', version: '1' })
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get('reset')
  // @Roles(enumRoles.admin)
  async getMainData() {
    await this.cacheService.reset();

    Ok();
  }
}
