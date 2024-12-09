import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { InsertCategoryDto } from './dto';
import { JwtGuard } from 'src/auth/Guards';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  allCategory() {
    return this.categoryService.getAllCategory()
  }

  @Post('/insert')
  createCategory(@Body() dto: InsertCategoryDto) {
    return this.categoryService.addCategory(dto)
  }
}
