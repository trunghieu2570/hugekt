import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@app/hugekt-core/entities/post.entity';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}

    public getFeaturedPost(): Promise<Post[]> {
        return this.postRepository.find();
    }
}
