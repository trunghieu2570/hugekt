import {
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Query,
    Render,
    Req,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { DateTime } from 'luxon';
import { PaginationTypeEnum } from 'nestjs-typeorm-paginate';
import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import { UserIdentityInterceptor } from '@app/hugekt-web/common/interceptors/user-identity.interceptor';
import { AuthenticatedGuard } from '@app/hugekt-web/common/guards/authenticated.guard';

@Controller('admin/post')
@UseFilters(AuthExceptionFilter)
@UseInterceptors(UserIdentityInterceptor)
export class PostController {
    constructor(private postService: PostService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    @Render('admin/post/list')
    public async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Req() request: Request,
    ): Promise<any> {
        request.path;
        const posts = await this.postService.findAll({
            page,
            limit: 10,
            route: request.path,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
        });
        return { posts, DateTime };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('create')
    @Render('admin/post/editor')
    public async create(@Req() req: Request): Promise<any> {
        return {};
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @Render('admin/post/editor')
    public async update(@Param('id') id: number): Promise<any> {
        const post = await this.postService.findOne(id);
        const categories = await this.postService.getAllCategory();
        return { post, categories };
    }
}
