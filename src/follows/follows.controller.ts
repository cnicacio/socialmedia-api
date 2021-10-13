import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Follow } from '.prisma/client';
import { CreateFollowDto } from './follows.dto';
import { AuthGuard } from '@nestjs/passport';
import { FollowsService } from './follows.service';

@UseGuards(AuthGuard('jwt'))
@Controller('follows')
export class FollowsController {
  constructor(private service: FollowsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post(':userId')
  create(@Body() data: CreateFollowDto): Promise<Follow> {
    return this.service.create(data);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: number) {
    return this.service.unfollow(userId);
  }
}
