import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign.in.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
