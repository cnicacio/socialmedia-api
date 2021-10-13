import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async findUnique(username: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findAll() {
    return this.db.user.findMany();
  }

  async create(data: CreateUserDto) {
    const posts = data.nOfPosts?.map((nOfPosts) => ({
      id: nOfPosts,
    }));

    const follows = data.nOfFollows?.map((nOfFollows) => ({
      id: nOfFollows,
    }));

    const likes = data.nOfLikes?.map((nOfLikes) => ({
      id: nOfLikes,
    }));

    const existing = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
        nOfPosts: {
          connect: posts,
        },
        nOfFollows: {
          connect: follows,
        },
        nOfLikes: {
          connect: likes,
        },
      },
      include: {
        nOfPosts: true,
        nOfFollows: true,
      },
    });

    return user;
  }

  async update(username: string, data: CreateUserDto) {
    const posts = data.nOfPosts?.map((nOfPosts) => ({
      id: nOfPosts,
    }));

    const follows = data.nOfFollows?.map((nOfFollows) => ({
      id: nOfFollows,
    }));

    const likes = data.nOfLikes?.map((nOfLikes) => ({
      id: nOfLikes,
    }));

    const existing = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.update({
      data: {
        ...data,
        password: hashedPassword,
        nOfPosts: {
          connect: posts,
        },
        nOfFollows: {
          connect: follows,
        },
        nOfLikes: {
          connect: likes,
        },
      },
      include: {
        nOfPosts: true,
        nOfFollows: true,
      },
      where: { username },
    });

    return user;
  }

  async deleteUser(username: string) {
    return this.db.user.delete({
      where: {
        username,
      },
    });
  }
}
