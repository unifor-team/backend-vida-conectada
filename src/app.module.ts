import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
