import {UserRepository} from "../user-repository";
import {User} from "../../../modules/user/entities/user";

export class DataBaseUserRepository implements UserRepository {
    create(user: User): Promise<void> {
        return Promise.resolve(undefined);
    }

}