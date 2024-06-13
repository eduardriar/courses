import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';

// Dependency Injection
@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessageRepository) {}

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  create(content: string) {
    return this.messagesRepository.create(content);
  }
}
