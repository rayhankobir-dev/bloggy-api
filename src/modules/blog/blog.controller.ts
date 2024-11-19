import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { IsPublic } from '../auth/guard/authentication.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthUserId } from '../auth/decorator/auth-user-id.decorator';

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
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  findAll(): Promise<SuccessResponseDto> {
    return this.blogService.findBlogs();
  }

  @Get(':slug')
  @IsPublic()
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  findOne(@Query() blogSlug: string): Promise<SuccessResponseDto> {
    return this.blogService.findBlogBySlug(blogSlug);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  update(@Body() id: string): Promise<SuccessResponseDto> {
    return this.blogService.updateBlogById(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  remove(@Body() id: string): Promise<SuccessResponseDto> {
    return this.blogService.deleteBlogById(id);
  }
}
