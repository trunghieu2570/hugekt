import { User } from '@app/hugekt-core/entities/user.entity';
import { LoginGuard } from '@app/hugekt-web/common/guards/login.guard';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';

@Controller('api/authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}

    @UseGuards(LoginGuard)
    @Post()
    public async login(@Req() req: Request): Promise<any> {
        const token = this.authService.login(req.user as User);
        return token;
    }
}
