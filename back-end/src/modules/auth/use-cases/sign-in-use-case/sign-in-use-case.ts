import { Injectable } from '@nestjs/common';
import { User } from '../../../user/entities/user';
import { UserPayload } from '../../../../http/auth/models/user-payload';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
