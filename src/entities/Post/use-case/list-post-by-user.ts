import { UseCase } from "src/core";
import { CreatePostMapper } from "../mapper/dto-to-post";
import { UserRepository } from "../repository/post.repository";
import { Response } from "src/helpers/response";
import { PrismaService } from "src/prisma/prisma.service";

export class ListPostsByUseUseCase implements UseCase {
  private postMapper: CreatePostMapper;
  private userRepository: UserRepository;
  
  constructor() {
     this.postMapper = new CreatePostMapper();
     this.userRepository = new UserRepository(new PrismaService(), this.postMapper);
  }

  handle(name: string): Promise<Response> {
    return this.userRepository.listByUser(name);
  }
}