import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthenticatedRequestModel } from '../models/authenticated-request-model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private expectedRole: string) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<AuthenticatedRequestModel>();
        const user = request.user;

        console.log('Usuário:', user); // Log para verificar o usuário
        console.log('Papel esperado:', this.expectedRole); // Log para verificar o papel esperado

        // Verifique se o usuário existe e se o papel é 'admin' ou igual ao esperado
        if (!user || (user.role !== this.expectedRole && user.role !== 'admin')) {
            throw new ForbiddenException('Acesso negado. Apenas administradores podem realizar esta ação.');
        }

        return true; // Permite o acesso se o papel estiver correto
    }
}
