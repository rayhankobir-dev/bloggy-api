import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(
    categoryDto: CreateCategoryDto,
    createdBy: string,
  ): Promise<SuccessResponseDto> {
    const category = await this.categoryRepository.create({
      ...categoryDto,
      createdBy,
    });
    return new SuccessResponseDto('Category created successfully', category);
  }

  async findCategories(): Promise<SuccessResponseDto> {
    try {
      const categories = await this.categoryRepository.getAll();
      return new SuccessResponseDto(
        'Categories fetched successfully',
        categories,
      );
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error finding categories:`, error);
      throw new BadRequestException('Failed to find categories');
    }
  }

  async updateCategory(id: string): Promise<SuccessResponseDto> {
    try {
      const category = await this.categoryRepository.updateOneById(id, {});
      return new SuccessResponseDto('Category updated successfully', category);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error updating category:`, error);
      throw new BadRequestException('Failed to update category');
    }
  }

  async deleteCategory(id: string): Promise<SuccessResponseDto> {
    try {
      const category = await this.categoryRepository.removeOneById(id);
      return new SuccessResponseDto('Category deleted successfully', category);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error deleting category:`, error);
      throw new BadRequestException('Failed to delete category');
    }
  }
}
