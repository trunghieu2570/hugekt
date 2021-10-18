import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Request } from 'express';
import { PaginationTypeEnum } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '@app/hugekt-web/common/guards/jwt-auth.guard';

@Controller('api/tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get('all')
    async findAll(): Promise<any> {
        const tags = await this.tagService.findAll();
        return tags;
    }

    @Get()
    async find(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit,
        @Req() request: Request,
    ): Promise<any> {
        const tags = await this.tagService.find({
            page,
            limit,
            route: request.path,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
        });
        return tags.items;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(+id, updateTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagService.remove(+id);
    }
}
