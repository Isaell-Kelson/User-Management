import { Request } from 'express';

export class AuthenticatedRequestModel extends Request {
  user: {
    role: string;
    id: string;
    email: string;
    name: string;
    created_at: string;
  };
}
