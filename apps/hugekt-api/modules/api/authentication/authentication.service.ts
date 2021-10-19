import { User } from '@app/hugekt-core/entities/user.entity';
import { UserService } from '@app/hugekt-core/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && user.passwordHash === pass) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, uid: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
