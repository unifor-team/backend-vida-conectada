import { User } from "../User";
import { IUserRepository } from "./user-repository-type";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "src/helpers/response";
import HttpStatusCode from "src/utils/status-code";
import { UserMapper } from "../mapper/dto-to-user";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService, private readonly userMapper: UserMapper) {}
  
  async create(user: User): Promise<Response> {
    try {
      const anUser =  this.userMapper.mapTo(user);
      const created = await this.prisma.user.create({ data: anUser });

      delete created.password;
      return Response.build({ status: HttpStatusCode.CREATED, message: "User created with success!", body: created });
    } catch (error: any) {
      return Response.build({ status: HttpStatusCode.BAD_REQUEST, message: error.message });
    }
  }
}