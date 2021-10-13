import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Follow } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowDto } from './follows.dto';

@Injectable()
export class FollowsService {
  constructor(private db: PrismaService) {}

  async findUnique(userId: number): Promise<Follow> {
    const follow = await this.db.follow.findUnique({
      where: { userId },
    });

    if (!follow) {
      throw new NotFoundException();
    }

    return follow;
  }

  async findAll() {
    return this.db.follow.findMany();
  }

  async create(userId: number) {
    const follow = await this.db.follow.create({
      data: {
        userId,
      },
    });

    return follow;
  }

  async unfollow(userId: number) {
    return this.db.follow.delete({
      where: {
        userId,
      },
    });
  }
}
