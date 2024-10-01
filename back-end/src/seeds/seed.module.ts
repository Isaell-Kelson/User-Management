import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaUserRepository } from '../repositories/user-repository/prisma-repository/prisma-user-repository';
import { PrismaService } from '../repositories/user-repository/prisma-repository/prisma.service';
import { UserRepository } from '../repositories/user-repository/user-repository';

@Module({
  providers: [
    SeedService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class SeedsModule {}
