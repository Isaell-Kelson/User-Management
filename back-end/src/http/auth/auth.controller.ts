import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/auth-request-model';
import { SignInUseCase } from '../../modules/auth/use-cases/sign-in-use-case/sign-in-use-case';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorator/is-public';
import { UsersService } from '../../modules/user/user.service';

@Controller()
export class AuthController {
  constructor(
    private signUseCase: SignInUseCase,
    private usersService: UsersService, // Injetando o UsersService aqui
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signUseCase.execute({
      user: request.user,
    });
    return { access_token };
  }

  // @Get('test')
  // @UseGuards(JwtAuthGuard)
  // async test(@Request() request: AuthenticatedRequestModel) {
  //   return request.user;
  // }
}
