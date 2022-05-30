import { IsNotEmpty, IsUUID } from 'class-validator';

export class AgritecGetObtentorDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;
}
