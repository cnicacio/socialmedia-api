import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':username')
  findUnique(@Param('username') username: string): Promise<User> {
    return this.service.findUnique(username);
  }

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @Put(':username')
  update(@Param('username') username: string, @Body() data: CreateUserDto) {
    return this.service.update(username, data);
  }

  @Delete(':username')
  delete(@Param('username') username: string) {
    return this.service.deleteUser(username);
  }
}
