import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostType } from "../enums";
import { Comment } from '../../comments/entities/comment.entity'

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  text: string;

  @Column('varchar', { nullable: true })
  image?: string;

  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}