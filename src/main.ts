import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configCors } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configCors(app);
  await app.listen(3000);
}
bootstrap();
