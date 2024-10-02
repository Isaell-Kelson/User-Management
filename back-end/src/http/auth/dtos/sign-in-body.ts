import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInBody {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
