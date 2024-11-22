import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SlugBlogQueryDto {
  @ApiProperty({
    description: 'Blog slug to get details',
  })
  @IsNotEmpty()
  @IsString()
  readonly slug: string;
}
