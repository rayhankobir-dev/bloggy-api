import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a sample comment.',
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @Length(1, 255, {
    message: 'Content must be between 1 and 255 characters',
  })
  content: string;
}
