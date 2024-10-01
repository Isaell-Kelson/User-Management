import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user-repository/user-repository';
import { User } from './entities/user';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {}

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User> {
        return await this.userRepository.update(id, userData);
    }

    async changeUserRole(id: string, newRole: string): Promise<User> {
        return await this.userRepository.changeRole(id, newRole);
    }

}
