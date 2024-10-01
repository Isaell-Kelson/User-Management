import {Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthRequestModel} from "./models/auth-request-model";
import {SignInUseCase} from "../../modules/auth/use-cases/sign-in-use-case/sign-in-use-case";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {Public} from "./decorator/is-public";
import {AuthenticatedRequestModel} from "./models/authenticated-request-model";


@Controller()
export class AuthController {
    constructor(private signUseCase: SignInUseCase) {
    }

    @Post('')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() request: AuthRequestModel) {
        const access_token = await this.signUseCase.execute({
            user: request.user,
        });

        return {access_token};
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    async test(@Request() request: AuthenticatedRequestModel) {
        return request.user;
    }

}