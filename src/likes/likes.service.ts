import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Like } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './likes.dto';

@Injectable()
export class LikesService {
  constructor(private db: PrismaService) {}

  async create(postId: number) {
    const like = await this.db.like.create({
      data: {
        postId,
      },
    });

    return like;
  }

  async unlike(postId: number) {
    return this.db.like.delete({
      where: {
        postId,
      },
    });
  }
}
