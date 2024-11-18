import { GenericRepository } from '../common/repository/generic.repository';
import { Blog, BlogDocument, BlogType } from './entities/blog.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogRepository extends GenericRepository<BlogDocument> {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Blog.name)
    private model: BlogType,
  ) {
    const logger = new Logger(BlogRepository.name);
    super(model, logger);
    this.logger = logger;
  }
}
