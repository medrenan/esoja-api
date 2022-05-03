import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(id: string, email: string, roles: string[] | string) {
    const payload = { id: id, email: email, roles: roles };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
