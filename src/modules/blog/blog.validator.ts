import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CategoryRepository } from '../category/category.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { TagRepository } from '../tag/tag.repository';

@Injectable()
export class BlogValidator {
  private readonly logger = new Logger(BlogValidator.name);

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async validateCategory(blogDto: CreateBlogDto) {
    if (
      !blogDto?.category ||
      !(await this.categoryRepository.validateObjectIds([blogDto.category]))
    ) {
      this.logger.error(`Category is not valid: ${blogDto.category}`);
      throw new BadRequestException('Category is not valid');
    }

    if (
      blogDto.tags.length !== 0 &&
      !(await this.tagRepository.validateObjectIds(blogDto.tags))
    ) {
      this.logger.error(`Tags are not valid: ${blogDto.tags.join(', ')}`);
      throw new BadRequestException('Tags are not valid');
    }
  }
}
