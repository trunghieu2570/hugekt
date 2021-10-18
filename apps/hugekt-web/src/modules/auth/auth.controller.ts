import { LoginGuard } from '@app/hugekt-web/common/guards/login.guard';
import {
    Controller,
    Get,
    Post,
    Query,
    Render,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    @Render('auth/login')
    public async index(@Query('url') action: string): Promise<any> {
        return {
            action: action,
        };
    }

    @UseGuards(LoginGuard)
    @Post('login')
    public async login(
        @Res() res: Response,
        @Query('url') action: string,
    ): Promise<any> {
        if (action) return res.redirect(action);
        return res.redirect('/');
    }
}
