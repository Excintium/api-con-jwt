import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      const producto = this.productoRepository.create(createProductoDto);
      return await this.productoRepository.save(producto);
    } catch (error) {
      throw new BadRequestException(`Error al crear el producto: ${error}`);
    }
  }

  async findAll(): Promise<Producto[]> {
    // Le decimos que solo traiga productos donde deletedAt ES NULO
    return await this.productoRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: number): Promise<Producto> {
    // Le decimos que solo busque productos donde deletedAt ES NULO
    const producto = await this.productoRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });

    if (!producto) {
      throw new NotFoundException('Producto con ID ' + id + ' no encontrado');
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id); // findOne ya está filtrando, así que esto es seguro
    const productoActualizado = Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(productoActualizado);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verificamos que existe (y no está borrado)
    await this.productoRepository.softDelete(id); // Lo marcamos como borrado
  }
}
