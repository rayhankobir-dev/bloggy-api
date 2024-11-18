import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Unique name of the category',
    example: 'Updated Technology',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Category name must be a string' })
  @Length(3, 50, {
    message: 'Category name must be between 3 and 50 characters',
  })
  name?: string;
}
