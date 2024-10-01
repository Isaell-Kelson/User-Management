import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../../../modules/user/entities/user';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (user.role !== 'admin') {
      throw new ForbiddenException(
        'Acesso negado. Você não tem permissão para realizar esta ação.',
      );
    }

    return true;
  }
}
