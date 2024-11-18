import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<SuccessResponseDto> {
    try {
      const comment = await this.commentRepository.create(createCommentDto);
      return new SuccessResponseDto('Comment created successfully', comment);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error creating comment:`, error);
      throw new BadRequestException('Failed to create a comment');
    }
  }

  async deleteComment(id: string): Promise<SuccessResponseDto> {
    try {
      const comment = await this.commentRepository.removeOneById(id);
      return new SuccessResponseDto('Comment deleted successfully', comment);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error deleting comment:`, error);
      throw new BadRequestException('Failed to delete a comment');
    }
  }

  async replyComment(id: string): Promise<SuccessResponseDto> {
    try {
      const comment = await this.commentRepository.updateOneById(id, {});
      return new SuccessResponseDto('Comment updated successfully', comment);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error updating comment:`, error);
      throw new BadRequestException('Failed to update a comment');
    }
  }
}
