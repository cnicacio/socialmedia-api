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
import { Post } from '.prisma/client';
import { CreatePostDto } from './posts.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findUnique(@Param('id') id: number): Promise<Post> {
    return this.service.findUnique(id);
  }

  @Post()
  create(@Body() data: CreatePostDto): Promise<Post> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: CreatePostDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.deletePost(id);
  }
}
