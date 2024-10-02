import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../modules/user/use-cases/create-user-use-case/create-use-user-case';
import {
  ChangeUserRoleDto,
  CreateUserBody,
} from '../../../modules/user/dtos/create-user-body';
import { UsersService } from '../../../modules/user/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthenticatedRequestModel } from '../../auth/models/authenticated-request-model';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { User } from '../../../modules/user/entities/user';
import { Public } from '../../auth/decorator/is-public';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private usersService: UsersService,
  ) {}

  @Get('list')
  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Post('create')
  @Public()
  async createUser(@Body() createUserBody: CreateUserBody) {
    return await this.createUserUseCase.execute(createUserBody);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  async deleteUser(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequestModel,
  ) {
    console.log('Tentativa de exclusão pelo usuário:', request.user);
    await this.usersService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso.' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
    @Request() request: AuthenticatedRequestModel,
  ) {
    console.log('Tentativa de atualização pelo usuário:', request.user);
    await this.usersService.updateUser(id, userData);
    return { message: 'Usuário atualizado com sucesso.' };
  }

  @Put(':id/role')
  @UseGuards(JwtAuthGuard, new RolesGuard('admin'))
  async changeUserRole(
    @Param('id') id: string,
    @Body() changeUserRoleDto: ChangeUserRoleDto,
    @Request() request: AuthenticatedRequestModel,
  ) {
    console.log('Tentativa de atualização de role pelo usuário:', request.user);
    await this.usersService.changeUserRole(id, changeUserRoleDto.role);
    return { message: 'Role do usuário atualizado com sucesso.' };
  }
}
