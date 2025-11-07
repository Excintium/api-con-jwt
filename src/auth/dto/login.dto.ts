// src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const trim = ({ value }: TransformFnParams): string =>
  typeof value === 'string' ? value.trim() : '';

const trimLower = ({ value }: TransformFnParams): string =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

export class LoginDto {
  @IsEmail()
  @Transform(trimLower)
  email!: string;

  @IsString()
  @MinLength(6)
  @Transform(trim)
  password!: string;
}
