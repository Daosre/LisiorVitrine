import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.categroy.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategory() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        name: true,
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
      throw new ForbiddenException('Name Already Taken');
    }
    const category = await this.prisma.category.create({
      data: {
        ...dto,
      },
      select: {
        name: true,
      },
    });
    return category;
  }

  async updateCategory(dto: UpdateCategoryDto, id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingCategory) {
      throw new ForbiddenException('Unexisting Category');
    }
    const existingCategoryName = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (existingCategoryName) {
      throw new ForbiddenException('Name Already Taken');
    }
    await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return { message: 'Update Sucessfully' };
  }

  async deleteCategory(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingCategory) {
      throw new ForbiddenException('Unexising Id');
    }
    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Delete' };
  }
}
