import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 75 })
    name: string;

    @Column('varchar', { length: 100 })
    slug: string;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];
}
