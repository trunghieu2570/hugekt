import { User } from '@app/hugekt-core/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    public findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findOne(email: string): Promise<User> {
        return this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }
}
