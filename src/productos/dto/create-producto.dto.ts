import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsString() @IsNotEmpty() @MaxLength(100) nombre: string;
  @IsString() @IsOptional() description?: string;
  @IsNumber() @IsNotEmpty() @Min(0) precio: number;
  @IsNumber() @IsOptional() @Min(0) stock?: number;
  @IsBoolean() @IsOptional() activo?: boolean;
}
