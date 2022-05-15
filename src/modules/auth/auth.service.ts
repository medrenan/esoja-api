import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import defaultPlainToClass from '@src/utils/functions/default.plain.to.class.fn';
import { FindUserDto } from '../user/dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import axios from 'axios';
import { SocialSignInDto } from './dto/social.sign.in.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

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

  async socialSignIn(body: SocialSignInDto) {
    if (body.provider === 'google') {
      return this.googleSignIn(body.token);
    } else if (body.provider === 'facebook') {
      return this.facebookSignIn(body.token);
    }
  }

  private async googleSignIn(token: string) {
    const url = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`;

    const googleUser: GoogleInterface = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);

        throw new BadRequestException('Cannot connect to Google');
      });

    const user = await this.prisma.user.findUnique({ where: { socialId: googleUser.id } });

    if (user) return { id: user.id, token: this.generateToken(user.id, user.email, user.role) };

    return this.userService.createUserBySocialSignIn('google', googleUser.id, googleUser.email, googleUser.name, googleUser.picture);
  }

  private async facebookSignIn(token: string) {
    const url = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`;

    const facebookUser: FacebookInterface = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);

        throw new BadRequestException('Cannot connect to facebook');
      });

    const user = await this.prisma.user.findUnique({ where: { socialId: facebookUser.id } });

    if (user) return { id: user.id, token: this.generateToken(user.id, user.email, user.role) };

    return this.userService.createUserBySocialSignIn(
      'facebook',
      facebookUser.id,
      facebookUser.email,
      facebookUser.name,
      facebookUser.picture.data.url,
    );
  }
}

interface FacebookInterface {
  id: string;
  name: string;
  email: string;
  picture: { data: { url: string } };
}

interface GoogleInterface {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  locale: string;
  picture: string;
}
