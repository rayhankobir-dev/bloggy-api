import { PaginatedResponseDto } from '../common/dto/paginate-response.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { ListBlogQuery } from './dto/list-blog-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogRepository } from './blog.repository';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly logger: Logger = new Logger(BlogService.name);
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createBlog(
    blogDto: CreateBlogDto,
    author: string,
  ): Promise<SuccessResponseDto> {
    try {
      if (await this.blogRepository.getOneWhere({ slug: blogDto.slug }))
        throw new BadRequestException('Blog already exists with this slug');

      const thumbnail = await this.cloudinaryService.uploadSingleImage(
        blogDto.thumbnail,
      );

      const blog = await this.blogRepository.create({
        ...blogDto,
        thumbnail,
        author,
      });

      return new SuccessResponseDto('Blog created successfully', blog);
    } catch (error) {
      this.logger.error(`Error creating blog:`, error);
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error creating blog:`, error);
      throw new BadRequestException('Failed to create a blog');
    }
  }

  async findBlogs({
    page = 1,
    limit = 10,
    category,
    title,
  }: ListBlogQuery): Promise<PaginatedResponseDto> {
    try {
      const searchQuery: Record<string, any> = {};
      if (category) {
        searchQuery['category'] = category;
      }
      if (title) {
        searchQuery['title'] = { $regex: title, $options: 'i' };
      }

      const totalRecords = await this.blogRepository.count(searchQuery);
      const skip = (page - 1) * limit;

      const blogs = await this.blogRepository.getAll(searchQuery, {
        limit,
        skip,
      });

      return new PaginatedResponseDto(totalRecords, page, limit, blogs);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error finding blogs:`, error);
      throw new BadRequestException('Failed to find blogs');
    }
  }

  async findBlogById(id: string): Promise<SuccessResponseDto> {
    try {
      const blog = await this.blogRepository.getOneById(id);
      return new SuccessResponseDto('Blog fetched successfully', blog);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error finding blog:`, error);
      throw new BadRequestException('Failed to find blog');
    }
  }

  async findBlogBySlug(slug: string): Promise<SuccessResponseDto> {
    try {
      const blog = await this.blogRepository.getOneWhere({ slug });
      return new SuccessResponseDto('Blog fetched successfully', blog);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error finding blog:`, error);
      throw new BadRequestException('Failed to find blog');
    }
  }

  async updateBlogById(id: string): Promise<SuccessResponseDto> {
    try {
      const blog = await this.blogRepository.updateOneById(id, {});
      return new SuccessResponseDto('Blog updated successfully', blog);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error updating blog:`, error);
      throw new BadRequestException('Failed to update blog');
    }
  }

  async deleteBlogById(id: string): Promise<SuccessResponseDto> {
    try {
      const blog = await this.blogRepository.removeOneById(id);
      return new SuccessResponseDto('Blog deleted successfully', blog);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error deleting blog:`, error);
      throw new BadRequestException('Failed to delete blog');
    }
  }
}
