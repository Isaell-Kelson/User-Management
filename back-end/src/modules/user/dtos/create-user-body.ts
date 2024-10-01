import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';
export class CreateUserBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  status: true;

  @IsNotEmpty()
  @IsString()
  role: string;
}

export class ChangeUserRoleDto {
  @IsString()
  role: string;
}
