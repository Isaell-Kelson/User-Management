import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthRequestModel } from './models/auth-request-model';
import { SignInUseCase } from '../../modules/auth/use-cases/sign-in-use-case/sign-in-use-case';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorator/is-public';
import { AuthenticatedRequestModel } from './models/authenticated-request-model';

@Controller()
export class AuthController {
  constructor(private signUseCase: SignInUseCase) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signUseCase.execute({
      user: request.user,
    });
    console.log('Token gerado:', access_token);
    return { access_token };
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
