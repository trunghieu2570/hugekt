import { Post } from '@app/hugekt-core/entities/post.entity';
import { classToPlain, plainToClass } from 'class-transformer';

export class PostDto {
    title: string;
    content: string;
    slug: string;
    category: number;
    tags: string[];

    static toPost(dto: PostDto): Post {
        const plain = classToPlain(dto);
        return plainToClass(Post, plain);
    }

    static mergeWithPost(post: Post, dto: PostDto, additional?: any): Post {
        const converted = PostDto.toPost(dto);
        return { ...post, ...converted, ...additional };
    }
}
