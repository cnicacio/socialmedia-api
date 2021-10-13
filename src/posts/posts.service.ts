import { Post } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private db: PrismaService) {}

  async findUnique(id: number): Promise<Post> {
    const post = await this.db.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async findAll() {
    return this.db.post.findMany();
  }

  async create(data: CreatePostDto) {
    const likes = data.likes?.map((likes) => ({
      id: likes,
    }));

    const post = await this.db.post.create({
      data: {
        ...data,
        likes: {
          connect: likes,
        },
      },
      include: {
        likes: true,
      },
    });

    return post;
  }

  async update(id: number, data: CreatePostDto) {
    const likes = data.likes?.map((likes) => ({
      id: likes,
    }));

    const post = await this.db.post.update({
      data: {
        ...data,
        likes: {
          connect: likes,
        },
      },
      include: {
        likes: true,
      },
      where: { id },
    });

    return post;
  }

  async deletePost(id: number) {
    return this.db.post.delete({
      where: {
        id,
      },
    });
  }
}
