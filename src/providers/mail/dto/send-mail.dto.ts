import { Expose } from 'class-transformer';

export class SendMailDto {
  @Expose()
  context: any;

  @Expose()
  template: string;

  @Expose()
  subject: string;

  @Expose()
  to: string;
}
