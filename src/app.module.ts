import { Module } from "@nestjs/common";
import { UserModule } from "./entities/User/user.module";
import { ConfigModule } from "@nestjs/config";
import { PostModule } from "./entities/Post/post.module";

@Module({
  imports: [
    UserModule,
    PostModule,
    ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
