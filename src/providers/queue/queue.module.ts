import { BullModule, InjectQueue } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { MailService } from '../mail/mail.service';
import { QueueConsumerService } from './services/queue.consumer.service';
import { QueueProducerService } from './services/queue.producer.service';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        redis: {
          host: process.env.REDIS_HOST,
          password: process.env.REDIS_PASS,
          port: Number(process.env.REDIS_PORT) || 6379,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'queue',
    }),
  ],
  providers: [QueueConsumerService, QueueProducerService, MailService],
  exports: [QueueConsumerService, QueueProducerService],
})
export class QueueModule {
  constructor(@InjectQueue('queue') private queue: Queue) {}

  // configure(consumer: MiddlewareConsumer) {
  //   const { router } = createBullBoard([new BullAdapter(this.queue)]);

  //   consumer.apply(router).forRoutes('/admin/queues');
  // }
}
