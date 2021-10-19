import { UserService } from '@app/hugekt-core/modules/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && user.passwordHash === pass) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
}
