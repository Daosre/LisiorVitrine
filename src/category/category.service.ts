import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertCategoryDto } from './dto/create.category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategory() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async addCategory(dto: InsertCategoryDto) {
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (existingCategory) {
      throw new ForbiddenException('Nom déjà utilisé');
    }
    const category = await this.prisma.category.create({
      data: {
        ...dto,
      },
    });
    return category
  }
}
