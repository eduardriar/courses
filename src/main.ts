import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  // It is use to validate the content and syntax of the incoming information
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
