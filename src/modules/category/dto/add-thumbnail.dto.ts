import { PickType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class AddThumbnailDto extends PickType(CreateCategoryDto, [
  'thumbnail',
]) {}
