import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ImageModule,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
