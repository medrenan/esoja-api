import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AgritechModule } from './agritech/agritech.module';
import { BaseCacheModule } from './cache/cache.module';
import { ImeaModule } from './imea/imea.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [ScheduleModule.forRoot(), BaseCacheModule, JwtModule, PrismaModule, MailModule, AgritechModule, QueueModule, ImeaModule],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
