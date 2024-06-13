import { IsString } from 'class-validator';

export class CreateMessageDTO {
  // Decorator that validates the content
  @IsString()
  content: string;
}
