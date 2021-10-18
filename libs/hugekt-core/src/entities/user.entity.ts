import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    firstName: string;

    @Column('varchar', { length: 50 })
    lastName: string;

    @Column('varchar', { length: 255 })
    email: string;

    @Column('varchar', { length: 255 })
    passwordHash: string;

    @CreateDateColumn()
    registerAt: Date;

    @Column('datetime')
    lastLogin: Date;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}
