import { CreateUserDTO } from "./create-user.dto";

export interface LoginDTO extends Partial<CreateUserDTO> {
  email: string;
  password: string;
}