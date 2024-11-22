import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoryDto {
  @ApiProperty({
    description: 'Category id for deleting',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid category id' })
  readonly categoryId: string;
}
