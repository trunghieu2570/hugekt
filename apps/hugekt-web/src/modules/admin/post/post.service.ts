import { Category } from '@app/hugekt-core/entities/category.entity';
import { Post } from '@app/hugekt-core/entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IPaginationOptions,
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
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
            .select(['post', 'user.email'])
            .getOne();
    }

    public getAllCategory(): Promise<Category[]> {
        return this.categoryRepository.find();
    }
}
