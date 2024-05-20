import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./use-case";

@Module({
  imports: [],
  controllers: [],
  providers: [CreateUserUseCase],
})
export class UserModule {}
