import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DB_URL } from './config';
import { Comment } from './comments/entities/comment.entity';
import { CommentModule } from './comments/comments.module';
import { Post } from './posts/entities/posts.entity';
import { PostModule } from './posts/post.module';
import { User } from './users/entities/user.entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      logging: false,
      entities: [User, Post, Comment],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
