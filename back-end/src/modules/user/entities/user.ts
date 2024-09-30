import {randomUUID} from 'node:crypto'
import {Replace} from "../../../utils/replace";

interface UserSchema {
    name: string;
    email: string;
    password: string;
    status: true;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    props: UserSchema;
    _id: string;

    constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
        };
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.name = name;
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.email = email;
    }

    get password(): string {
        return this.props.password;
    }

    set password(password: string) {
        this.password = password;
    }

    get status(): true {
        return this.props.status;
    }

    set status(status: string) {
        this.status = status;
    }

    get role(): string {
        return this.props.role;
    }

    set role(role: string) {
        this.role = role;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }


    get updatedAt(): Date {
        return this.props.updatedAt;
    }


}