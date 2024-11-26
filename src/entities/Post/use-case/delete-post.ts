import { UseCase } from "src/core";
import { CreatePostDTO } from "../dto/create-post.dto";
import { CreatePostMapper } from "../mapper/dto-to-post";
import { UserRepository } from "../repository/post.repository";
import { Response } from "src/helpers/response";
import { PrismaService } from "src/prisma/prisma.service";
import { decode } from "jsonwebtoken";


export class DeletePostUseCase implements UseCase {
  private postMapper: CreatePostMapper;
  private userRepository: UserRepository;
  
  constructor() {
     this.postMapper = new CreatePostMapper();
     this.userRepository = new UserRepository(new PrismaService(), this.postMapper);
  }

  handle(id: string, token: string): Promise<Response> {
    const { sub } = decode(token);
    if (!sub) throw new Error();
    return this.userRepository.delete(Number(id));
  }
}