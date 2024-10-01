import {UserRepository} from "../user-repository";
import {User} from "../../../modules/user/entities/user";

export class DataBaseUserRepository implements UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {

        const user = this.users.find(user => user.email === email);
        return user || null;
    }

}
