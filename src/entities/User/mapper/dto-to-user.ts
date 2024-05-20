import { Mapper } from "src/core";
import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../User";

export class UserMapper extends Mapper<CreateUserDTO, User> {
  public mapFrom(param: CreateUserDTO): User {
    const { name, email, password } = param;
    const user = User.build();
    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setCreatedAt(new Date());
    return user;
  }
  
  public mapTo(user: User): CreateUserDTO {
    return {
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      created_at: user.getCreatedAt()
    }
  }
}