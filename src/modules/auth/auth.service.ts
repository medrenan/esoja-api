import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import defaultPlainToClass from '@src/utils/functions/default.plain.to.class.fn';
import { FindUserDto } from '../user/dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@src/providers/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  generateToken(id: string, email: string, roles: string[] | string) {
    const payload = { id: id, email: email, roles: roles };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('Incorrect email/password combination');

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) throw new BadRequestException('Incorrect email/password combination');

    const token = this.generateToken(user.id, user.email, user.role);

    return { user: defaultPlainToClass(FindUserDto, user), token };
  }
}
