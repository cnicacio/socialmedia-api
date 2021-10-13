import {
  Body,
  Controller,
  Post,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Like } from '.prisma/client';
import { CreateLikeDto } from './likes.dto';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';

@UseGuards(AuthGuard('jwt'))
@Controller('likes')
export class LikesController {
  constructor(private service: LikesService) {}

  @Post(':postId')
  create(@Body() data: CreateLikeDto): Promise<Like> {
    return this.service.create(data);
  }

  @Delete(':postId')
  create(@Param('postId') postId: number) {
    return this.service.unlike(postId);
  }
}
