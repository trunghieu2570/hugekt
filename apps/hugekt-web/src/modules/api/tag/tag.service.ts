import { Tag } from '@app/hugekt-core/entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IPaginationOptions,
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    ) {}

    create(createTagDto: CreateTagDto) {
        return 'This action adds a new tag';
    }

    findOne(id: number) {
        return `This action returns a #${id} tag`;
    }

    public async findAll(): Promise<Tag[]> {
        return this.tagRepository.find();
    }

    public async find(options: IPaginationOptions): Promise<Pagination<Tag>> {
        return paginate<Tag>(this.tagRepository, options);
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
