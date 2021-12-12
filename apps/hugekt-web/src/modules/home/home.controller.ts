import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import { Controller, Get, Render, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { HomeService } from './home.service';

@Controller('/')
@UseFilters(AuthExceptionFilter)
export class HomeController {
    constructor(private homeService: HomeService) {}

    //@UseGuards(AuthenticatedGuard)
    @Get()
    @Render('home')
    public async index(@Req() req: Request): Promise<any> {
        const posts = await this.homeService.getFeaturedPost();
        //console.log(req.user);
        return {
            home: {
                title: 'Xin chào!!',
                subtitle: 'Chúc bạn có một ngày tốt lành.',
            },
            posts: posts,
        };
    }
}
