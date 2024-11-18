import { GenericRepository } from '../common/repository/generic.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Comment,
  CommentDocument,
  CommentType,
} from './entities/comment.entity';

@Injectable()
export class CommentRepository extends GenericRepository<CommentDocument> {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Comment.name)
    private model: CommentType,
  ) {
    const logger = new Logger(CommentRepository.name);
    super(model, logger);
    this.logger = logger;
  }
}
