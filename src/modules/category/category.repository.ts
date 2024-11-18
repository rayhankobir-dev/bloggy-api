import { GenericRepository } from '../common/repository/generic.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
  CategoryType,
} from './entities/category.entity';

@Injectable()
export class CategoryRepository extends GenericRepository<CategoryDocument> {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Category.name)
    private model: CategoryType,
  ) {
    const logger = new Logger(CategoryRepository.name);
    super(model, logger);
    this.logger = logger;
  }
}
