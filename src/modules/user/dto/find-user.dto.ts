import { Expose } from 'class-transformer';

export class FindUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  picture: string;

  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
