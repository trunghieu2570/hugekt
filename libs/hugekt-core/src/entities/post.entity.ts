import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Column('varchar', { length: 75 })
    title: string;

    @Column('varchar', { length: 100 })
    slug: string;

    @Column({ default: false })
    published: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('text')
    content: string;

    @Column('datetime')
    publishedAt: Date;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category;

    @ManyToMany(() => Tag, (tag) => tag.posts)
    @JoinTable()
    tags: Tag[];
}
