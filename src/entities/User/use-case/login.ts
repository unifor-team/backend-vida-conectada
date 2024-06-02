import { UseCase } from "src/core";
import { UserMapper } from "../mapper/dto-to-user";
import { UserRepository } from "../repository/user.repository";
import { Response } from "src/helpers/response";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDTO } from "../dto/login.dto";
import { JwtService } from "@nestjs/jwt";


export class LoginUseCase implements UseCase {
  private userMapper: UserMapper;
  private userRepository: UserRepository;
  private jwtService: JwtService;
  
  constructor() {
     this.userMapper = new UserMapper();
     this.userRepository = new UserRepository(new PrismaService(), this.userMapper);
     this.jwtService = new JwtService();
  }

  async handle(params: LoginDTO): Promise<Response> {
    const response = await this.userRepository.findUserByEmailAndPassword(params);
    const body = response.getBody();

    if (!Object.keys(body).length) return response;

    const payload = { sub: body.id, username: body.email };
    const newBody = await this.jwtService.signAsync(
      payload, { secret: process.env.JWT_SECRETS }
     );
    response.setBody({ acessToken: newBody });

    return response;
  }
}