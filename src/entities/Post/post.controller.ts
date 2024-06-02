import { Body, Controller, Delete, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { CreatePostUseCase, DeletePostUseCase } from './use-case';
import { Response } from 'src/helpers/response';
import { CreatePostDTO } from './dto/create-post.dto';
import { ListAllPostsUseCase } from './use-case/list-post';
import { ListPostsByUseUseCase } from './use-case/list-post-by-user';

@Controller("/post")
export class PostController {
  constructor(
    private readonly createPost: CreatePostUseCase,
    private readonly listAllPosts: ListAllPostsUseCase,
    private readonly deletePost: DeletePostUseCase,
    private readonly listByUser: ListPostsByUseUseCase
  ) {}

  @Post("/create")
  create(@Body() params: CreatePostDTO, @Headers('Authorization') authorization: string): Promise<Response> {
    if (!params.content || !params.title || !authorization) throw new Error();
    try {
      return this.createPost.handle(params, authorization);
    } catch (er) {
      throw new Error(er)
    }
  }

  @Get("/")
  listAll(): Promise<Response> {
    return this.listAllPosts.handle();
  }

  @Get("/find")
  listPostByUser(@Query('name') name: string): Promise<Response> {
    return this.listByUser.handle(name);
  }

  @Delete("/:id")
  delete(@Param('id') id: string, @Headers('Authorization') authorization: string) {
    return this.deletePost.handle(id, authorization);
  }
}
