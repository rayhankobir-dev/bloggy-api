import { ApiProperty } from '@nestjs/swagger';
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
    description: 'Category ID for the blog',
    example: '63f1c5f1e4231b5a6a7b12f3',
    required: false,
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Category ID must be a valid MongoDB ObjectId' })
  category?: string;

  @ApiProperty({
    description: 'Tags associated with the blog',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array of IDs' })
  @IsMongoId({
    each: true,
    message: 'Each tag must be a valid MongoDB ObjectId',
  })
  tags?: string[];

  @ApiProperty({
    description: 'Thumbnail URL for the blog',
  })
  @IsNotEmpty({ message: 'Thumbnail is required' })
  @IsString({ message: 'Thumbnail must be a string' })
  thumbnail: string;

  @ApiProperty({
    description: 'Content of the blog',
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Author ID of the blog',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Author ID must be a valid MongoDB ObjectId' })
  author: string;

  @ApiProperty({
    description: 'Publication status of the blog',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isPublished must be a boolean value' })
  isPublished?: boolean;

  @ApiProperty({
    description: 'Comments associated with the blog',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Comments must be an array of IDs' })
  @IsMongoId({
    each: true,
    message: 'Each comment must be a valid MongoDB ObjectId',
  })
  comments?: string[];
}
