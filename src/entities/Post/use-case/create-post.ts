import { UseCase } from "src/core";
import { CreatePostDTO } from "../dto/create-post.dto";
import { CreatePostMapper } from "../mapper/dto-to-post";
import { UserRepository } from "../repository/post.repository";
import { Response } from "src/helpers/response";
import { PrismaService } from "src/prisma/prisma.service";
import { decode } from "jsonwebtoken";


export class CreatePostUseCase implements UseCase {
  private postMapper: CreatePostMapper;
  private userRepository: UserRepository;
  
  constructor() {
     this.postMapper = new CreatePostMapper();
     this.userRepository = new UserRepository(new PrismaService(), this.postMapper);
  }

  handle(params: CreatePostDTO, token: string): Promise<Response> {
    const { sub } = decode(token);
    if (!sub) throw new Error();
    const user = this.postMapper.mapFrom({...params, id: Number(sub) });
    return this.userRepository.create(user);
  }
}