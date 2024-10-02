import { UserRepository } from '../user-repository';
import { User } from '../../../modules/user/entities/user';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    // Altere o retorno para User | null
    const user = this.users.find((user) => user.email === email); // Encontra o usuário pelo email
    return user || null; // Retorna o usuário encontrado ou null se não existir
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id); // Filtra os usuários que não possuem o id passado
  }

  changeRole(id: string, newRole: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  update(id: string, userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    return Promise.resolve([]);
  }
}
