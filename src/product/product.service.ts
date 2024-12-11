import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct() {
    return this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        name: true,
        description: true,
        image: true,
        price: true,
      },
    });
  }

  async insertProduct(dto: InsertProductDto) {
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (existingProduct) {
      throw new ForbiddenException('Name Already Taken');
    }

    await this.prisma.product.create({
      data: {
        ...dto,
      },
    });
    return { message: 'Successfull Created' };
  }

  async updateProduct(dto: UpdateProductDto, id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingProduct || !existingProduct) {
      throw new ForbiddenException('Unexisting Id');
    }
    const existingProductName = await this.prisma.product.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (existingProductName) {
      throw new ForbiddenException('Name Already Taken');
    }
    await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return { message: 'Successfull' };
  }

  async deleteProduct(id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingProduct || !existingProduct) {
      throw new ForbiddenException('Unexisting Id');
    }
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Delete' };
  }
}
