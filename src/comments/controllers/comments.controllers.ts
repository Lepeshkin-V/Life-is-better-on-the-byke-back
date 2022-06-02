import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { UpdateCommentDto } from "../dtos/update-comment.dto";
import { Comment } from '../entities/comment.entity'
import { CommentsService } from "../services/comment.service";
@ApiTags('Comments')
@Controller('posts/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBody({ type: CreateCommentDto })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Comment })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: CreateCommentDto, @Param('id') postId: string): Promise<Comment> {
    return this.commentsService.create(postId, input);
  }
  
  @ApiResponse({ status: 200, type: [Comment] })
  @ApiParam({ name: 'id' })
  @Get()
  async find(@Param('id') postId: string): Promise<Comment[]> {
    return this.commentsService.find(postId);
  }
  
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, type: Comment })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':commentId')
  async update(@Body() input: UpdateCommentDto, @Param('commentId') commentId: string): Promise<Comment> {
    return this.commentsService.update(commentId, input);
  }
  
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId')
  async delete(@Req() req: Request, @Param('commentId') commentId: string): Promise<boolean> {
    return this.commentsService.delete(commentId, req?.user['id']);
  }
}