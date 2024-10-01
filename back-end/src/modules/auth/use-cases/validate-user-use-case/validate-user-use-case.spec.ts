import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserUseCase } from './validate-user-use-case';
import { UserRepository } from '../../../../repositories/user-repository/user-repository';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('Caso de uso: validar usuário', () => {
  let useCase: ValidateUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ValidateUserUseCase>(ValidateUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('Deve retornar o usuário se o email e a senha estiverem corretos', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual(mockUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(compare).toHaveBeenCalledWith('password', 'hashedPassword');
  });

  it('Deve lançar UnauthorizedException se o email não for encontrado', async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(UnauthorizedException);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('Deve lançar UnauthorizedException se a senha não corresponder', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(UnauthorizedException);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(compare).toHaveBeenCalledWith('password', 'hashedPassword');
  });
});
