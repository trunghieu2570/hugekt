import { Post } from '@app/hugekt-core/entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}

    public findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    public findOne(id: number): Promise<Post> {
        return this.postRepository.findOne(id);
    }
}
