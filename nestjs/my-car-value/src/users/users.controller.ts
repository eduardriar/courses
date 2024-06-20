import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UsersService } from './users.service';

// @Controller decorator allow us to create the auth path in this case
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDTO) {
    if (this.usersService.userExists(body.email)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      this.usersService.create(body.email, body.password);
    }
  }

  @Delete('/deleteall')
  deleteAllUsers() {
    this.usersService.deleteAllUsers();
  }
}
