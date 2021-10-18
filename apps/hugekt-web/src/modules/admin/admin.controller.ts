import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '@app/hugekt-web/common/guards/authenticated.guard';
import { UserIdentityInterceptor } from '@app/hugekt-web/common/interceptors/user-identity.interceptor';
import {
    Controller,
    Get,
    Render,
    Req,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('admin')
@UseFilters(AuthExceptionFilter)
@UseInterceptors(UserIdentityInterceptor)
export class AdminController {
    @UseGuards(AuthenticatedGuard)
    @Get()
    @Render('admin')
    public async index(@Req() req: Request): Promise<any> {
        return {};
    }
}
