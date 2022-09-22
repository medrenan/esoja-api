import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { paramId } from '@src/utils/dtos/param.id.dto';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Roles(enumRoles.admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  // @Roles(enumRoles.admin)
  findOne(@Param() param: paramId) {
    return this.userService.findOne(param.id);
  }

  @Put(':id')
  // @Roles(enumRoles.isSameUser)
  update(@Param() param: paramId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(param.id, updateUserDto);
  }

  @Delete(':id')
  // @Roles(enumRoles.isSameUser)
  remove(@Param() param: paramId) {
    return this.userService.remove(param.id);
  }
}
