import { GenericRepository } from '../common/repository/generic.repository';
import { Tag, TagDocument, TagType } from './entities/tag.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagRepository extends GenericRepository<TagDocument> {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Tag.name)
    private model: TagType,
  ) {
    const logger = new Logger(TagRepository.name);
    super(model, logger);
    this.logger = logger;
  }
}
