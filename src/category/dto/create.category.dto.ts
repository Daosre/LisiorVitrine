import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class InsertCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  name: string;
}
