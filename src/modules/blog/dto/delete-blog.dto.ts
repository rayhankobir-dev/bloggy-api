import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteBlogDto {
  @ApiProperty({
    description: 'Blog id for deleting',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid blog id' })
  readonly blogId: string;
}
