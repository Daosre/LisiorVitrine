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
import { InsertProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string) {
    return this.productService.oneProduct(id);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  insertProduct(@Body() dto: InsertProductDto) {
    return this.productService.insertProduct(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateProduct(@Body() dto: UpdateProductDto, @Param('id') id: string) {
    return this.productService.updateProduct(dto, id);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('/search/:product')
  SearchProduct(@Param('product') product: string) {
    return this.productService.searchProduct(product);
  }
}
