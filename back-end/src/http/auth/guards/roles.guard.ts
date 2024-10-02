import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthenticatedRequestModel } from '../models/authenticated-request-model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private expectedRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequestModel>();
    const user = request.user;

    console.log('Usuário:', user);
    console.log('Papel esperado:', this.expectedRole);

    if (!user || (user.role !== this.expectedRole && user.role !== 'admin')) {
      throw new ForbiddenException(
        'Acesso negado. Apenas administradores podem realizar esta ação.',
      );
    }

    return true;
  }
}
