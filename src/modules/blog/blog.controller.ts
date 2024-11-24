import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserId } from '../auth/decorator/auth-user-id.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { IsPublic } from '../auth/guard/authentication.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SlugBlogQueryDto } from './dto/slug-blog-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';
import { BlogService } from './blog.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PaginatedResponseDto } from '../common/dto/paginate-response.dto';
import { ListBlogQuery } from './dto/list-blog-query.dto';

@ApiTags('Blog')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('thumbnail'))
  create(
    @AuthUserId() { userId }: ITokenPayload,
    @UploadedFiles() thumbnail: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<SuccessResponseDto> {
    createBlogDto.thumbnail = thumbnail;
    return this.blogService.createBlog(createBlogDto, userId);
  }

  @Get()
  @IsPublic()
  @ApiResponse({ status: 200, type: PaginatedResponseDto })
  findAll(@Query() query: ListBlogQuery): Promise<PaginatedResponseDto> {
    return this.blogService.findBlogs(query);
  }

  @Get(':slug')
  @IsPublic()
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  findOne(@Param() { slug }: SlugBlogQueryDto): Promise<SuccessResponseDto> {
    return this.blogService.findBlogBySlug(slug);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  update(@Body() id: string): Promise<SuccessResponseDto> {
    return this.blogService.updateBlogById(id);
  }

  @Delete(':blogId')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  remove(@Param() { blogId }: DeleteBlogDto): Promise<SuccessResponseDto> {
    return this.blogService.deleteBlogById(blogId);
  }
}
