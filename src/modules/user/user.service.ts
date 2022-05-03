import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/providers/prisma/prisma.service';
import { QuerybuilderService } from '@src/providers/prisma/querybuilder/querybuilder.service';
import defaultPlainToClass from '@src/utils/functions/default.plain.to.class.fn';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly qb: QuerybuilderService, private readonly authService: AuthService) {}

  async create(createDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: createDto.email } });

    if (userExists) throw new BadRequestException('User already exists');

    delete createDto.passwordConfirmation;

    const user = await this.prisma.user.create({ data: { ...createDto, password: bcrypt.hashSync(createDto.password, 10) } });

    const token = this.authService.generateToken(user.id, user.email, user.role);

    return { id: user.id, token };
  }

  async findAll() {
    const query = await this.qb.query('user');

    const users = await this.prisma.user.findMany(query);

    return defaultPlainToClass(FindUserDto, users);
  }

  async findOne(id: string) {
    const query = await this.qb.query('user');

    const users = await this.prisma.user.findFirst({ ...query, where: { id: id } });

    return defaultPlainToClass(FindUserDto, users);
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { id: id } });

    if (!userExists) throw new BadRequestException(`User don't exists`);

    delete updateDto.passwordConfirmation;

    await this.prisma.user.update({ where: { id: id }, data: updateDto });
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findUnique({ where: { id: id } });

    if (!userExists) throw new BadRequestException(`User don't exists`);

    await this.prisma.user.delete({ where: { id: id } });
  }
}
