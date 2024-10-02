import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  role: string;
}
