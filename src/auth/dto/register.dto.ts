// src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const trim = ({ value }: TransformFnParams): string =>
  typeof value === 'string' ? value.trim() : '';

const trimLower = ({ value }: TransformFnParams): string =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  @Transform(trim)
  name!: string;

  @IsEmail()
  @Transform(trimLower)
  email!: string;

  @IsString()
  @MinLength(6)
  @Transform(trim)
  password!: string;
}
