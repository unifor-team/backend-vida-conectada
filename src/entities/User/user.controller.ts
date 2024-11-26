import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserUseCase, LoginUseCase } from './use-case';
import { Response } from 'src/helpers/response';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller("/user")
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly userLogin: LoginUseCase
  ) {}

  
  @Post("/login") //login de usuário
  login(@Body() params: LoginDTO): Promise<Response> {
   return this.userLogin.handle(params);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("/create") //criação de usuário
  create(@Body() params: CreateUserDTO): Promise<Response> {
    if (!params.email || !params.password || !params.name) throw new Error();
    try {
      return this.createUser.handle(params);
    } catch (er) {
      throw new Error(er)
    }
  }

}
