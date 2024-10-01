import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserUseCase} from "../../../modules/user/use-cases/create-user-use-case/create-use-user-case";
import {CreateUserBody} from "../../../modules/user/dtos/create-user-body";

@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) {
    }

    @Post()
    async createPost(@Body() body: CreateUserBody) {
        const {name, email, password, status, role} = body;

        const user = await this.createUserUseCase.execute({
            name,
            email,
            password,
            status,
            role,
        });
        return user;
    }
}