import { IsNotEmpty, IsUUID } from 'class-validator';

export class paramId {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
