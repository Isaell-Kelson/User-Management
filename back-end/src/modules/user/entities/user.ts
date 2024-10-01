import { randomUUID } from 'node:crypto';
import { Replace } from '../../../utils/replace';

interface UserSchema {
  name: string;
  email: string;
  password: string;
  status: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserSchema;
  private readonly _id: string;

  constructor(
    props: Replace<UserSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get status(): boolean {
    return this.props.status;
  }

  get role(): string {
    return this.props.role;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
