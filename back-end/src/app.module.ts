import {Module} from '@nestjs/common';
import {UserModule} from "./modules/user/user.module";
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from "./http/auth/auth.module";
import {JwtAuthGuard} from "./http/auth/guards/jwt-auth.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
    imports: [UserModule, DatabaseModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ],
})
export class AppModule {
}
