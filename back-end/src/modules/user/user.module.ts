import { Module } from '@nestjs/common';
import { UserController } from '../../http/controllers/user-controller/user.controller';
import { CreateUserUseCase } from './use-cases/create-user-use-case/create-use-user-case';
import { DatabaseModule } from '../../database/database.module';
import { UsersService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase, UsersService],
})
export class UserModule {}
