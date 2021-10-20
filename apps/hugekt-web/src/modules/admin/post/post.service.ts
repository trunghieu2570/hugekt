import { Category } from '@app/hugekt-core/entities/category.entity';
import { Post } from '@app/hugekt-core/entities/post.entity';
import { Tag } from '@app/hugekt-core/entities/tag.entity';
import { User } from '@app/hugekt-core/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IPaginationOptions,
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';

const generateSlug = (str: string): string =>
    slugify(str, { lower: true, trim: true });

@Injectable()
export default class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    public findAll(options: IPaginationOptions): Promise<Pagination<Post>> {
        //return this.postRepository.find({ relations: ['author'] });
        const query = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'user')
            .select(['post', 'user.email']);

        return paginate<Post>(query, options);
    }

    public findOne(id: number): Promise<Post> {
        //return this.postRepository.find({ relations: ['author'] });
        return this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .leftJoinAndSelect('post.author', 'user')
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.tags', 'tag')
            .select(['post', 'user.email', 'category.id', 'tag.id'])
            .getOne();
    }

    public delete(post: Post): Promise<any> {
        return this.postRepository.remove(post);
    }

    public async updatePost(
        id: number,
        dto: PostDto,
        author: User,
    ): Promise<Post> {
        const toUpdate = await this.postRepository.findOne(id);
        dto.slug = generateSlug(dto.title);
        const updated = PostDto.mergeWithPost(toUpdate, dto);
        updated.tags = await this.findOrCreateTags(dto.tags);
        updated.author = author;

        return this.postRepository.save(updated);
    }

    public async createPost(dto: PostDto, author: User): Promise<Post> {
        dto.slug = generateSlug(dto.title);
        const updated = PostDto.mergeWithPost(new Post(), dto);
        updated.tags = await this.findOrCreateTags(dto.tags);
        updated.author = author;

        return this.postRepository.save(updated);
    }

    private async findOrCreateTags(tags: string[]): Promise<Tag[]> {
        if (!tags || tags.length === 0) return [];

        return await Promise.all(
            tags.map(async function (tag): Promise<Tag> {
                let _tag: Tag = await this.tagRepository.findOne({
                    slug: tag,
                });
                if (!_tag) {
                    let slug: string = null;
                    let num = 0;
                    const baseSlug = generateSlug(tag);
                    while (true) {
                        slug = num === 0 ? baseSlug : `${baseSlug}-${num}`;

                        const foundTag = await this.tagRepository.findOne({
                            slug: slug,
                        });

                        if (foundTag) num++;
                        else break;
                    }

                    const toAdd: Tag = {
                        name: tag,
                        slug: slug,
                        id: undefined,
                        posts: [],
                    };
                    _tag = await this.tagRepository.save(toAdd);
                    return _tag;
                }
                return _tag;
            }, this),
        );
    }

    public getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    public getAllTags(): Promise<Tag[]> {
        return this.tagRepository.find();
    }
}
