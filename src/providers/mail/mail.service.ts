import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendMail(data: SendMailDto) {
    await this.mailer.sendMail({
      to: data.to,
      subject: data.subject,
      template: __dirname + `/templates/${data.template}`,
      context: { ...data.context },
    });
  }
}
