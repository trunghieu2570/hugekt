import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import { Controller, Get, Param, Render, UseFilters } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
@UseFilters(AuthExceptionFilter)
export class PostController {
    constructor(private postService: PostService) {}

    @Get(':id')
    @Render('post')
    public async get(@Param() params): Promise<Record<string, unknown>> {
        console.log(params.id);
        const post = await this.postService.findOne(params.id);
        return { post };
    }
}
