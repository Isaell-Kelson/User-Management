import { Module } from '@nestjs/common';
import { PrismaService } from '../repositories/user-repository/prisma-repository/prisma.service';
import { UserRepository } from '../repositories/user-repository/user-repository';
import { PrismaUserRepository } from '../repositories/user-repository/prisma-repository/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
