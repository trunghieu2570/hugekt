import { AuthExceptionFilter } from '@app/hugekt-web/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '@app/hugekt-web/common/guards/authenticated.guard';
import {
    Controller,
    Get,
    Param,
    Render,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
@UseFilters(AuthExceptionFilter)
export class PostController {
    constructor(private postService: PostService) {}

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @Render('post')
    public async get(@Param() params): Promise<Record<string, unknown>> {
        console.log(params.id);
        const post = await this.postService.findOne(params.id);
        return { post };
    }
}
