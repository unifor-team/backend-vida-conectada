import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-case';
import { Response } from 'src/helpers/response';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller("/user")
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase
  ) {}

  @Post("/create")
  create(@Body() params: CreateUserDTO): Promise<Response> {
    return this.createUser.handle(params);
  }
}
