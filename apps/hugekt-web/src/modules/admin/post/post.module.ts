import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@app/hugekt-core/entities/category.entity';
import { Tag } from '@app/hugekt-core/entities/tag.entity';
import { Post } from '@app/hugekt-core/entities/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, Category, Tag])],
    providers: [PostService],
    controllers: [PostController],
})
export class PostModule {}
