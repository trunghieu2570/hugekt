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
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { PostService } from './post.service';
import { DateTime } from 'luxon';
import { UserIdentityInterceptor } from 'src/common/interceptors/user-identity.interceptor';
import { PaginationTypeEnum } from 'nestjs-typeorm-paginate';

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
