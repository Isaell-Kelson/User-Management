import {User} from '../entities/user'
import {User as UserRaw} from "@prisma/client";

export class PrismaUserMapper {
    static toPrisma({id, name, email, password, role, status, createdAt, updatedAt}: User): UserRaw {
        return {
            id,
            name,
            email,
            password,
            role,
            status,
            createdAt,
            updatedAt
        }
    }

    static toDomain({id, ...userData}: UserRaw): User {
        return new User({
            ...userData,
        }, id)
    }
}