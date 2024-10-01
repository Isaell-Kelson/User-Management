import { User } from '../entities/user';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({
    id,
    name,
    email,
    password,
    role,
    status,
    createdAt,
    updatedAt,
  }: User): UserRaw {
    return {
      id,
      name,
      email,
      password,
      role, // role está incluído aqui
      status,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    name,
    email,
    password,
    role,
    status,
    createdAt,
    updatedAt,
  }: UserRaw): User {
    // Adicione role aqui
    return new User(
      {
        name,
        email,
        password,
        role, // Certifique-se de que role está incluído aqui
        status,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
