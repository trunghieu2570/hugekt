import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Render,
    UseFilters,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
@UseFilters(AuthExceptionFilter)
export class PostController {
    constructor(private postService: PostService) {}

    @Get('article/:id')
    @Render('post')
    public async getById(@Param() params): Promise<Record<string, unknown>> {
        const post = await this.postService.findOne(params.id);
        if (!post) throw new NotFoundException();
        return { post };
    }

    @Get('a/:slug')
    @Render('post')
    public async getBySlug(@Param() params): Promise<Record<string, unknown>> {
        const post = await this.postService.findOneBySlug(params.slug);
        if (!post) throw new NotFoundException();
        return { post };
    }
}
