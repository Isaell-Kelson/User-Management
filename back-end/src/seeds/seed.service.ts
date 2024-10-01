import {Injectable, OnModuleInit} from '@nestjs/common';
import {UserRepository} from '../repositories/user-repository/user-repository';
import {hash} from 'bcrypt';
import {User} from '../modules/user/entities/user';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(private userRepository: UserRepository) {
    }

    async onModuleInit() {
        await this.createAdminUser();
    }

    private async createAdminUser() {
        const adminEmail = 'admin';


        const existingAdmin = await this.userRepository.findByEmail(adminEmail);

        if (!existingAdmin) {
            const hashedPassword = await hash('admin', 10);


            const adminUser = new User({
                name: 'admin',
                email: adminEmail,
                password: hashedPassword,
                status: true,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            });


            await this.userRepository.create(adminUser);
            console.log('Usuário admin criado com sucesso.');
        } else {
            console.log('Usuário admin já existe.');
        }
    }
}
