import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "../dtos/create-posts.dto";
import { PostPreview } from "../dtos/post-preview.dto";
import { UpdatePostsDto } from "../dtos/update-post.dto";
import { Post as PostEntity } from "../entities/posts.entity";
import { PostType } from "../enums";
import { PostsService } from "../services/posts.services";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 200, type: PostEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(input);
  }
  
  @ApiResponse({ status: 200, type: [PostEntity] })
  @Get()
  async find(): Promise<PostEntity[]> {
    return this.postsService.find();
  }
  
  @ApiResponse({ status: 200, type: PostEntity })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }
  
  @ApiBody({ type: UpdatePostsDto })
  @ApiResponse({ status: 200, type: PostEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Body() input: UpdatePostsDto, @Param('id') id: string): Promise<PostEntity> {
    return this.postsService.update(id, input);
  }
  
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.postsService.delete(id);
  }
}