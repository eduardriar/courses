import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

// To generate controller just run
// * nest generate controller messages/messages --flat*

// nest generate -> Command to run nest generative option
// controller    -> Type of class to generate
// messages      -> Place the file in the messages folder
// /messages     -> Call the class 'messages'
// --flat        -> Don't create an extra folder called controllers
@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  // Behind sceenes class-transformer create an instance of the classDTO coming rom the body
  @Post()
  createMessages(@Body() body: CreateMessageDTO) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessages(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException(`Message with id: ${id} not found`);
    }

    return message;
  }
}
