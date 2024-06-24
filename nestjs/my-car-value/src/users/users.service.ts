import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create method creates an instance of the entity, so we ensure the values are saved correctly
    // If the enetity was not created Nest hooks are not fired
    const user = this.repo.create({ email, password });

    // Then with save we can persist that data in DB
    return this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async find(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async findAll() {
    return await this.repo.query('SELECT * FROM user');
  }

  // We use Partial type to pass incomplete information, this means not to updated the complete user data
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }

  async userExists(email: string) {
    const userExists = await this.repo.exists({ where: { email } });
    console.log(userExists);

    return userExists;
  }

  deleteAllUsers() {
    return this.repo.clear();
  }
}
