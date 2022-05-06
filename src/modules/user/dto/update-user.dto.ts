import { PartialType } from '@nestjs/mapped-types';
import { ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ValidateIf((data) => data.password)
  passwordConfirmation: string;
}
