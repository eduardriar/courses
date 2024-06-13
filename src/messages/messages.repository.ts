import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

const messagesPath = 'messages.json';

@Injectable()
export class MessageRepository {
  async findOne(id: string) {
    const contents = await readFile(messagesPath, 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  async findAll() {
    const contents = await readFile(messagesPath, 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile(messagesPath, 'utf8');
    const messages = JSON.parse(contents);
    const newId = Number(this.getLastIdMessage(messages)) + 1;
    const newMessage = {
      ...messages,
      [newId]: {
        content,
        id: newId,
      },
    };

    await writeFile(messagesPath, JSON.stringify(newMessage));
  }

  private getLastIdMessage(messages: any) {
    const keysArray = Object.keys(messages);
    const lastId = keysArray.length === 0 ? 1 : keysArray[keysArray.length - 1];

    return lastId;
  }
}
