import {CreateUserUseCase} from "./create-use-user-case";
import {
    InMemoryUserRepository
} from "../../../../repositories/user-repository/in-memory-repository/in-memory-user-repository";
import {EmailAlreadyExistsError} from "../../../../errors/EmailAlreadyExistsError";
import {compare} from 'bcrypt';

let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Create User', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository();
        createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    });

    it('Deve ser possível criar um usuário com sucesso', async () => {
        expect(inMemoryUserRepository.users).toEqual([]);

        const user = await createUserUseCase.execute({
            name: 'Isaell',
            email: 'user@test.com',
            password: '123',
            role: 'user',
            status: true,
        });

        expect(inMemoryUserRepository.users).toEqual([user]);
    });

    it('Deve lançar um erro caso um usuário tente se cadastrar com um email já existente', async () => {
        await createUserUseCase.execute({
            name: 'João',
            email: 'joao@test.com',
            password: '456',
            role: 'user',
            status: true,
        });

        await expect(createUserUseCase.execute({
            name: 'Maria',
            email: 'joao@test.com',
            password: '789',
            role: 'user',
            status: true,
        })).rejects.toThrow(EmailAlreadyExistsError);
    });

    it('Deve encriptar a senha do usuário ao criar', async () => {
        const userPasswordWithoutEncryption = '123456789'

        const user = await createUserUseCase.execute({
            name: 'Julia',
            email: 'julia@test.com',
            password: userPasswordWithoutEncryption,
            role: 'user',
            status: true,
        });

        const userHasPasswordEncrypted = await compare(userPasswordWithoutEncryption, user.password);

        expect(userHasPasswordEncrypted).toBeTruthy();

    });

});
