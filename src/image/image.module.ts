import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';

@Module({
  controllers: [ImageController],
  providers: [],
})
export class ImageModule {}
