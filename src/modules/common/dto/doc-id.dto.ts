import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DocIdQueryDto {
  @ApiProperty({
    description: 'Document model id',
  })
  @IsMongoId({ message: 'Invalid document id' })
  @IsNotEmpty()
  readonly id: string;
}
