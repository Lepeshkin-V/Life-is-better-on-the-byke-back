import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "../dtos/create-posts.dto";
import { PostPreview } from "../dtos/post-preview.dto";
import { UpdatePostsDto } from "../dtos/update-post.dto";
import { Post } from "../entities/posts.entity";
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  async create(postDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.save(postDto);
  }

  async find(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }

  async update(id: string, postDto: UpdatePostsDto): Promise<Post> {
    return this.postsRepository.save({ id, ...postDto });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.postsRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}