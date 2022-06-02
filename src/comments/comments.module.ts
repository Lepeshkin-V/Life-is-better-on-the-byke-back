import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsController } from "./controllers/comments.controllers";
import { CommentsService } from "./services/comment.service";
import { Comment } from './entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentModule {}