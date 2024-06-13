import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageRepository } from './messages.repository';

// To create automatically modules just run
// * nest generate module messages *
// Dependency Injection in Nest js is very helpful while testing, that's the reason we're doing this
// providers property is used for the dependencies that are linked
@Module({
  controllers: [MessagesController],
  providers: [MessageRepository, MessagesService],
})
export class MessagesModule {}
