import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  precio: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
