import { Post } from "../Post";
import { IUserRepository } from "./post-repository-type";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "src/helpers/response";
import HttpStatusCode from "src/utils/status-code";
import { CreatePostMapper } from "../mapper/dto-to-post";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService, private readonly postMapper: CreatePostMapper) {}
  async listAll(): Promise<Response> {
    try {
      const posts = await this.prisma.post.findMany({
        where: { deleted_at: null },
        include: {
          created_by: true  // Assuming that you have a relation defined between post and user in your Prisma schema
        },
        orderBy: {
          created_at: 'desc'
        }
      });
      return Response.build({ status: HttpStatusCode.OK, message: "Postagens listadas com sucesso!", body: posts }); 
    } catch(err) {
      return Response.build({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: "Erro ao listar postagens!" });
    }
  }

  async listByUser(name: string): Promise<Response> {
    try {
      const posts = await this.prisma.post.findMany({
        where: { deleted_at: null,  created_by: {
          name: {
            contains: name, // Use contains filter for partial matches
            mode: 'default' // Case-insensitive search
          }
        }},
        include: {
          created_by: true 
        },
        orderBy: {
          created_at: 'desc'
        }
      });
      return Response.build({ status: HttpStatusCode.OK, message: "Postagens listadas com sucesso!", body: posts }); 
    } catch(err) {
      return Response.build({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: "Erro ao listar postagens!" });
    }
  }
  
  
  async create(user: Post): Promise<Response> {
    const aPost =  this.postMapper.mapTo(user);
    
    try {
      await this.prisma.post.create({
        data: aPost
      })
      return Response.build({ status: HttpStatusCode.CREATED, message: "Postagem criada com sucesso!" });
    } catch (error: any) {
      return Response.build({ status: HttpStatusCode.BAD_REQUEST, message: error.message });
    }
  }

  async delete(id: number): Promise<Response> {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });

      if (!post) {
        return Response.build({
          status: HttpStatusCode.NOT_FOUND,
          message: "Postagem não encontrada"
        });
      }

      await this.prisma.post.update({
        where: { id },
        data: { deleted_at: new Date() }
      });

      return Response.build({ status: HttpStatusCode.OK, message: "Postagem deletada com sucesso!" });
    } catch (err: any) {
      return Response.build({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: "Erro ao deletar postagem", body: err.message });
    }
  }

}