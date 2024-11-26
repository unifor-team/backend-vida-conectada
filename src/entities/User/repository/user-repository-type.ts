import { Response } from "src/helpers/response";
import { User } from "../User";

export interface IUserRepository {
  create(user: User): Promise<Response>;
}