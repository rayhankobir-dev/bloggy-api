import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Unique slug for the blog',
    example: 'my-first-blog',
  })
  @IsNotEmpty({ message: 'Slug is required' })
  @IsString({ message: 'Slug must be a string' })
  slug: string;

  @ApiProperty({
    description: 'Title of the blog',
    example: 'How to create a blog with NestJS',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @Length(10, 255, { message: 'Title must be between 10 and 255 characters' })
  title: string;
  @ApiProperty({
    description: 'Short description of the blog',
    example: 'This is a short description of my blog.',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Category id for the blog',
    example: '63f1c5f1e4231b5a6a7b12f3',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid category' })
  category: string;

  @ApiProperty({
    description: 'Tags associated with the blog',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @IsMongoId({
    each: true,
    message: 'Invalid tag',
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : value?.split(',')))
  tags?: string[];

  @ApiProperty({
    description: 'Thumbnail of the blog',
    required: true,
    type: 'file',
  })
  thumbnail: Express.Multer.File;

  @ApiProperty({
    description: 'Content of the blog',
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Publication status of the blog',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Status must be a boolean for isPublished' })
  isPublished?: boolean;
}
