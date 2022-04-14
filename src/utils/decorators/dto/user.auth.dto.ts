import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserAuth {
  @Expose()
  @IsString()
  id = '123123123123123123';
}
