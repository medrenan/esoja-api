import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SocialSignInDto {
  @IsEnum(['google', 'facebook'])
  @IsNotEmpty()
  provider: 'google' | 'facebook';

  @IsString()
  @IsNotEmpty()
  token: string;
}
