import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentDto {
  @ApiProperty({
    description: 'Comment id for deleting',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid comment id' })
  readonly commentId: string;
}
