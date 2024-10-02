import { User } from 'src/modules/user/entities/user';
import { UserRepository } from '../user-repository';
import { PrismaService } from './prisma.service';
import { PrismaUserMapper } from '../../../modules/user/mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: userData,
    });

    return PrismaUserMapper.toDomain(user);
  }

  async changeRole(id: string, newRole: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: newRole,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => PrismaUserMapper.toDomain(user));
  }
}
