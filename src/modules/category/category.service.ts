import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCategory(
    categoryDto: CreateCategoryDto,
    createdBy: string,
  ): Promise<SuccessResponseDto> {
    const slug = slugify(categoryDto.name, {
      lower: true,
    });

    if (await this.categoryRepository.getOneWhere({ slug }))
      throw new BadRequestException('Category already exists');

    const thumbnail = await this.cloudinaryService.uploadSingleImage(
      categoryDto.thumbnail,
    );

    const category = await this.categoryRepository.create({
      ...categoryDto,
      slug,
      thumbnail,
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
