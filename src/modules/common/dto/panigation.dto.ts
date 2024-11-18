import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Pagination {
  @ApiProperty({
    description: 'Page number',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public readonly page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public readonly limit?: number;
}
