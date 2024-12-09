import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guards';
import { CategoryService } from './category.service';
import { InsertCategoryDto } from './dto';
import { UpdateCategoryDto } from './dto/update.categroy.dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  allCategory() {
    return this.categoryService.getAllCategory();
  }

  @Post('/insert')
  createCategory(@Body() dto: InsertCategoryDto) {
    return this.categoryService.addCategory(dto);
  }

  @Patch('/update/:id')
  updateCategory(@Body() dto: UpdateCategoryDto, @Param('id') id: string) {
    return this.categoryService.updateCategory(dto, id);
  }

  @Delete('/delete/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id)
  }
}
