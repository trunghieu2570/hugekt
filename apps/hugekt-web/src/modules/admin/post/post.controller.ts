import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Query,
    Render,
    Req,
    Post,
    UseFilters,
    UseGuards,
    UseInterceptors,
    Res,
    NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import PostService from './post.service';
import { PaginationTypeEnum } from 'nestjs-typeorm-paginate';
import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import { UserIdentityInterceptor } from '@app/hugekt-web/common/interceptors/user-identity.interceptor';
import { AuthenticatedGuard } from '@app/hugekt-web/common/guards/authenticated.guard';
import { Post as PostEntity } from '@app/hugekt-core/entities/post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '@app/hugekt-core/entities/user.entity';

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
        return { posts };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('create')
    @Render('admin/post/editor')
    public async newPost(): Promise<any> {
        const post = new PostEntity();
        const categories = await this.postService.getAllCategories();
        const tags = await this.postService.getAllTags();
        return { post, categories, tags };
    }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    @Render('admin/post/editor')
    public async createPost(
        @Body() body: PostDto,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<any> {
        const created = await this.postService.createPost(
            body,
            req.user as User,
        );
        return res.redirect(`/admin/post/${created.id}`);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('categories')
    @Render('admin/post/categories')
    public async categories(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Req() request: Request,
    ): Promise<any> {
        request.path;
        const categories = await this.postService.findAllCategories({
            page,
            limit: 10,
            route: request.path,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
        });
        return { categories };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('delete/:id')
    public async deletePost(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<any> {
        const post = await this.postService.findOne(id);
        if (!post) throw new NotFoundException();

        await this.postService.delete(post);

        return res.redirect('/admin/post');
    }

    @UseGuards(AuthenticatedGuard)
    @Post(':id')
    @Render('admin/post/editor')
    public async updatePost(
        @Param('id') id: number,
        @Req() req: Request,
        @Body() body: PostDto,
    ): Promise<any> {
        await this.postService.updatePost(id, body, req.user as User);
        const post = await this.postService.findOne(id);
        const categories = await this.postService.getAllCategories();
        const tags = await this.postService.getAllTags();
        return { post, categories, tags };
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @Render('admin/post/editor')
    public async getPost(@Param('id') id: number): Promise<any> {
        const post = await this.postService.findOne(id);

        if (!post) throw new NotFoundException();

        const categories = await this.postService.getAllCategories();
        const tags = await this.postService.getAllTags();
        return { post, categories, tags };
    }
}
