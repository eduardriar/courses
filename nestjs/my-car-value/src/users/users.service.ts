import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async userExists(email: string) {
    const userExists = await this.repo.exists({ where: { email } });

    return userExists;
  }

  deleteAllUsers() {
    return this.repo.clear();
  }
}
