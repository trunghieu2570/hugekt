import { UserModule } from '@app/hugekt-core/modules/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})
export class AuthModule {}
