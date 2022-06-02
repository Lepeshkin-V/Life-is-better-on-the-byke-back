import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as crypto from 'crypto';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  login: string;

  @Column('varchar')
  password: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
