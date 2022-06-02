import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { UpdateCommentDto } from "../dtos/update-comment.dto";
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create(postId: string, commentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentsRepository.save({ postId, ...commentDto });
    return this.commentsRepository.findOne({ where: { id: comment.id }, relations: ['user'] });
  }
  

  async find(postId: string): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { postId }, relations:['user']});
  }

  async update(commentId: string, updatedComment: UpdateCommentDto): Promise<Comment> {
    const commentAuthorId = await this.commentsRepository.findOne({ where: { id: commentId }, select: ['userId'] });
    if (commentAuthorId.userId !== updatedComment.userId) {
      throw new Error('Это не ваш комментарий');
    }
    const comment = await this.commentsRepository.save({ ...updatedComment, id: commentId });
    return this.commentsRepository.findOne({ where: { id: comment.id }, relations: ['user'] });
  }

  async delete(commentId: string, userId: string): Promise<boolean> {
    try {
      const commentAuthorId = await this.commentsRepository.findOne({ where: { id: commentId }, select: ['userId'] });
      if (commentAuthorId.userId !== userId) {
        throw new Error('Это не ваш комментарий');
      }
      await this.commentsRepository.delete(commentId);
      return true;
    } catch (error) {
      return false;
    }
  }
}