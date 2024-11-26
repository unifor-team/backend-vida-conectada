import { Module } from "@nestjs/common";
import { CreateUserUseCase, LoginUseCase } from "./use-case";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: `${process.env.JWT_SECRETS}`,
  })],
  controllers: [UserController],
  providers: [CreateUserUseCase, LoginUseCase],
  exports: [LoginUseCase]
})
export class UserModule {}
