// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  create(data: CreateUserDto) {
    return this.usersRepo.save(data);
  }

  findOneByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  findOneById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
