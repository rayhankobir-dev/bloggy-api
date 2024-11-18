import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DocIdQueryDto {
  @ApiProperty({
    description: 'Document model id',
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;
}
