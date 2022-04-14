import { Module } from '@nestjs/common';
import { AgritechModule } from './agritech/agritech.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [JwtModule, PrismaModule, MailModule, AgritechModule, QueueModule],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
