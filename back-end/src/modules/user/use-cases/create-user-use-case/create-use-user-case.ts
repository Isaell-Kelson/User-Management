import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../../../repositories/user-repository/user-repository";
import {User} from "../../entities/user";
import {hash} from 'bcrypt';
import {EmailAlreadyExistsError} from "../../../../errors/EmailAlreadyExistsError";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    status?: true;
    role: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute({name, email, password, status, role}: CreateUserRequest) {

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new EmailAlreadyExistsError(email);
        }

        const hashedPassword = await hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            status: status ?? true,
            role,
            updatedAt: new Date(),
        });

        await this.userRepository.create(user);

        return user;
    }
}
