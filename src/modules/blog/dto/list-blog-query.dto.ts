import { Pagination } from 'src/modules/common/dto/panigation.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ListBlogQuery extends Pagination {
  @ApiProperty({
    description: 'Title of the blog',
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly title?: string;

  @ApiProperty({
    description: 'Category of the blog',
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly category?: string;
}
