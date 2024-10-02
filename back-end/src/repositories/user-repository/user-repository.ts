import { User } from '../../modules/user/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract delete(id: string): Promise<void>;

  abstract update(id: string, userData: Partial<User>): Promise<User>;

  abstract changeRole(id: string, newRole: string): Promise<User>;

  abstract findAll(): Promise<User[]>;
}
