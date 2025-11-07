// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    if (await this.users.findOneByEmail(email)) {
      throw new BadRequestException('El email ya existe');
    }
    const hashed = await bcrypt.hash(password, 10);
    await this.users.create({ name, email, password: hashed });
    return { message: 'Usuario creado exitosamente' };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.users.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Email inválido');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Contraseña inválida');

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      rol: user.rol,
    };
    const token = await this.jwt.signAsync(payload);
    return { access_token: token, email: user.email, name: user.name };
  }
}
