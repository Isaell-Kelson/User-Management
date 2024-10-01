import {IsNotEmpty, IsString, IsEmail, MinLength, IsBoolean} from 'class-validator'

export class CreateUserBody {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    status: true;

    @IsNotEmpty()
    @IsString()
    role: string;
}