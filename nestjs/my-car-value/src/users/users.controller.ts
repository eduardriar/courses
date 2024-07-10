import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dto/user.dto';

// @Controller decorator allow us to create the auth path in this case
@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO) {
    const email = body.email;
    const userExists = await this.usersService.userExists(email);

    if (userExists) {
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

  @Get('/users')
  async listUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
    // this.usersService.findOne(Number(id));
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Delete('/deleteall')
  deleteAllUsers() {
    this.usersService.deleteAllUsers();
  }
}
