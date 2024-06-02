import { User } from "../User";
import { IUserRepository } from "./user-repository-type";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "src/helpers/response";
import HttpStatusCode from "src/utils/status-code";
import { UserMapper } from "../mapper/dto-to-user";
import { LoginDTO } from "../dto/login.dto";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService, private readonly userMapper: UserMapper) {}
  
  async create(user: User): Promise<Response> {
    const anUser =  this.userMapper.mapTo(user);
    
    try {
      const anUserExist = await this.prisma.user.findFirst({ where: {
        email: anUser.email
      }});
      
      if (anUserExist) {
        return Response.build({ status: HttpStatusCode.BAD_REQUEST, message: "Email já existe." })
      }

      const created = await this.prisma.user.create({ data: anUser });

      delete created.password;
      return Response.build({ status: HttpStatusCode.CREATED, message: "Conta cadastrada com sucesso!", body: created });
    } catch (error: any) {
      return Response.build({ status: HttpStatusCode.BAD_REQUEST, message: error.message });
    }
  }

  async findUserByEmailAndPassword(user: LoginDTO): Promise<Response> {
    try {
      const anUser = await this.prisma.user.findFirst({ where: {
        email: user.email,
        password: user.password
      }});

      if (!anUser) {
        return Response.build({ status: HttpStatusCode.BAD_REQUEST, message: "Credenciais incorretas" });
      }

      return Response.build({ status: HttpStatusCode.OK, message: "Logado com sucesso!", body: anUser });
    } catch (error: any) {
      return Response.build({ status: HttpStatusCode.BAD_REQUEST, message: error.message });
    }
  }
}