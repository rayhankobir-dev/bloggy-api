import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @ApiProperty({
    description: 'Unique name of the tag (optional)',
    example: 'Updated Technology',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tag name must be a string' })
  @Length(3, 50, {
    message: 'Tag name must be between 3 and 50 characters',
  })
  name?: string;
}
