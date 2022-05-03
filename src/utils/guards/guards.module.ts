import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 100 })],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }, { provide: APP_GUARD, useClass: RolesGuard }, RolesGuard],
})
export class GuardsModule {}
