import { Module } from "@nestjs/common";
import { CreatePostUseCase, DeletePostUseCase } from "./use-case";
import { PostController } from "./post.controller";
import { JwtModule } from "@nestjs/jwt";
import { ListAllPostsUseCase } from "./use-case/list-post";
import { ListPostsByUseUseCase } from "./use-case/list-post-by-user";

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: `${process.env.JWT_SECRETS}`,
  })],
  controllers: [PostController],
  providers: [CreatePostUseCase, ListAllPostsUseCase, DeletePostUseCase, ListPostsByUseUseCase],
  exports: []
})
export class PostModule {}
