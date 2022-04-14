import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendMailDto } from '../mail/dto/send-mail.dto';
import { MailService } from '../mail/mail.service';

@Processor('queue')
export class QueueConsumerService {
  constructor(private readonly mailService: MailService) {}

  @Process('sendMail')
  async sendMailJob(job: Job<SendMailDto>) {
    const { data } = job;

    await this.mailService.sendMail(data);
  }

  @OnQueueCompleted()
  private onComplete(job: Job) {
    console.log(`Job completed ${job.name}`);
  }
  @OnQueueFailed()
  private onFailed(job: Job) {
    console.log(`Job Failed: ${job.id} - ${job.name}`);
  }
}
