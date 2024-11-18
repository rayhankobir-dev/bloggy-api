import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from './tag.repository';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class TagService {
  private readonly logger = new Logger(TagService.name);
  constructor(private readonly tagRepository: TagRepository) {}

  async createTag(
    tagCreateDto: CreateTagDto,
    createdBy: string,
  ): Promise<SuccessResponseDto> {
    try {
      const tag = await this.tagRepository.create({
        ...tagCreateDto,
        createdBy,
      });

      return new SuccessResponseDto('Tag created successfully', tag);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error creating tag:`, error);
      throw new BadRequestException('Failed to create a tag');
    }
  }

  async findTags(): Promise<SuccessResponseDto> {
    try {
      const tags = await this.tagRepository.getAll();
      return new SuccessResponseDto('Tags fetched successfully', tags);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error fetching tags:`, error);
      throw new BadRequestException('Failed to fetch tags');
    }
  }

  async updateTag(id: string): Promise<SuccessResponseDto> {
    try {
      const category = await this.tagRepository.updateOneById(id, {});
      return new SuccessResponseDto('Tag updated successfully', category);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error updating tag:`, error);
      throw new BadRequestException('Failed to update tag');
    }
  }

  async deleteTag(id: string): Promise<SuccessResponseDto> {
    try {
      const tag = await this.tagRepository.removeOneById(id);
      return new SuccessResponseDto('Tag deleted successfully', tag);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error deleting tag:`, error);
      throw new BadRequestException('Failed to delete tag');
    }
  }
}
