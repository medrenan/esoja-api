import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SendMailDto } from '../../mail/dto/send-mail.dto';

@Injectable()
export class QueueProducerService {
  constructor(@InjectQueue('queue') private queue: Queue) {}

  async addMailOnQueue(data: SendMailDto) {
    const job = await this.queue.add('sendMail', {
      to: data.to,
      subject: data.subject,
      template: data.template,
      context: { ...data.context },
    });

    return job.id;
  }

  async getJobById(jobId: string) {
    return this.queue.getJob(jobId).then((job) => job);
  }
}
