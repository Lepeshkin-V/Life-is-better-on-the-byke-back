import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getCountByLogin(login: string): Promise<number> {
    return this.usersRepository.count({ where: {login} });
  }

  async getByLoginAndPassword(login: string, password: string): Promise<User> {
    return this.usersRepository.findOne({ where: { login, password } });
  }

  async getOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(user));
  }
}
