import {User} from "../entities/user";


type Override = Partial<User>;

export const makeUser = ({}: Override) => {
    return new User({
        role: "",
        status: true,
        updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        email: 'email@email.com',
        name: 'João',
        password: '123456'
    });
};