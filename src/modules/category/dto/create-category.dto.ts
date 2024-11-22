import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Unique name of the category',
    example: 'Technology',
  })
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Slug of the category',
    example: 'technology',
  })
  @IsString({ message: 'Slug must be a string' })
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Thumbnail of the blog',
    required: true,
    type: 'file',
  })
  thumbnail: Express.Multer.File;
}
