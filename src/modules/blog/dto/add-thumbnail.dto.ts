import { PickType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class AddThumbnailDto extends PickType(CreateBlogDto, ['thumbnail']) {}
