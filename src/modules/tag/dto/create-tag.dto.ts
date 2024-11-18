import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Unique name of the tag',
    example: 'Technology',
  })
  @IsNotEmpty({ message: 'Tag name is required' })
  @IsString({ message: 'Tag name must be a string' })
  @Length(3, 50, {
    message: 'Tag name must be between 3 and 50 characters',
  })
  name: string;
}
