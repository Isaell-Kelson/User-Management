import { makeUser } from '../../../user/factories/user-factorie';
import { SignInUseCase } from './sign-in-use-case';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../../../http/auth/models/user-payload';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Deve criar um access_token válido', async () => {
    const user = makeUser({});

    const token = await signInUseCase.execute({
      user,
    });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
