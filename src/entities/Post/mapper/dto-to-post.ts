import { Mapper } from "src/core";
import { CreatePostDTO } from "../dto/create-post.dto";
import { Post } from "../Post";

export class CreatePostMapper extends Mapper<CreatePostDTO, Post> {
  public mapFrom(param: CreatePostDTO & { id: number }): Post {
    const { title, content, id } = param;
    const post = Post.build();
    post.setTitle(title);
    post.setContent(content);
    post.setCreatedAt(new Date());
    post.setUserId(id);
    return post;
  }
  
  public mapTo(post: Post): CreatePostDTO & { created_at: Date, updated_at: Date, deleted_at: Date, userId: number } {
    return {
      title: post.getTitle(),
      content: post.getContent(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
      deleted_at: post.getUpdatedAt(),
      userId: post.getUserId()
    }
  }
}