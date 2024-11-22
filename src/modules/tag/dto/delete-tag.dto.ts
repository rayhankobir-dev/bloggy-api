import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTagDto {
  @ApiProperty({
    description: 'Tag id for deleting',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid tag id' })
  readonly tagId: string;
}
