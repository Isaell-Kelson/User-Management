import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../../modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from '../../modules/auth/use-cases/validate-user-use-case/validate-user-use-case';
import { UserModule } from '../../modules/user/user.module';
import { DatabaseModule } from '../../database/database.module';
import { SignInDtoValidateMiddleware } from './middleware/sign-in-dto-validate.middleware';
import { SignInUseCase } from '../../modules/auth/use-cases/sign-in-use-case/sign-in-use-case';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtStrategy } from '../../modules/auth/strategies/jwt.strategy';
import { UsersService } from '../../modules/user/user.service';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ValidateUserUseCase,
    SignInUseCase,
    UsersService,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDtoValidateMiddleware).forRoutes('/login');
  }
}
