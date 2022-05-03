import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserAuth } from '@src/utils/decorators/dto/user.auth.dto';
import defaultValidateOrReject from '@src/utils/functions/default.validate.or.reject.fn';
import { plainToInstance } from 'class-transformer';
import { enumRoles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<enumRoles[]>('roles', context.getHandler());

    if (!roles || !roles.length) return true;

    const request = context.switchToHttp().getRequest();

    const reqUser = plainToInstance(UserAuth, { ...request.user });

    await defaultValidateOrReject(reqUser);

    if (roles.includes(enumRoles.isSameUser)) return request.params.id === reqUser.id;

    // falta implementar ação para admins

    return false;
  }
}
