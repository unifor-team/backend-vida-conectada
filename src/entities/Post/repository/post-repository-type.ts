import { Response } from "src/helpers/response";
import { Post } from "../Post";

export interface IUserRepository {
  create(user: Post): Promise<Response>;
  listAll(): Promise<Response>;
  delete(id: number): Promise<Response>; 
}