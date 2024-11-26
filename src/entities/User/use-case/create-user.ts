import { UseCase } from "src/core";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserMapper } from "../mapper/dto-to-user";
import { UserRepository } from "../repository/user.repository";
import { Response } from "src/helpers/response";
import { PrismaService } from "src/prisma/prisma.service";


export class CreateUserUseCase implements UseCase {
  private userMapper: UserMapper;
  private userRepository: UserRepository;
  
  constructor() {
     this.userMapper = new UserMapper();
     this.userRepository = new UserRepository(new PrismaService(), this.userMapper);
  }

  handle(params: CreateUserDTO): Promise<Response> {
    const user = this.userMapper.mapFrom(params);
    return this.userRepository.create(user);
  }
}