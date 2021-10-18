import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 75 })
    name: string;

    @Column('varchar', { length: 100 })
    slug: string;

    @ManyToMany(() => Post, (post) => post.tags)
    posts: Post[];
}
