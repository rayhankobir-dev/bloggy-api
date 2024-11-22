import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserId } from '../auth/decorator/auth-user-id.decorator';
import { RequiredRoles } from '../user/decorator/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IsPublic } from '../auth/guard/authentication.guard';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { UserRoleEnum } from '../user/enum/user-role.enum';
import { DocIdQueryDto } from '../common/dto/doc-id.dto';
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import slugify from 'slugify';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @ApiConsumes('multipart/form-data')
  // @RequiredRoles([UserRoleEnum.ADMIN])
  async create(
    @Body() categoryDto: CreateCategoryDto,
    @UploadedFiles() thumbnail: Express.Multer.File,
    @AuthUserId() { userId }: ITokenPayload,
  ): Promise<SuccessResponseDto> {
    categoryDto.thumbnail = thumbnail;
    categoryDto.slug = slugify(categoryDto.name);

    return await this.categoryService.createCategory(categoryDto, userId);
  }

  @Get()
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @IsPublic()
  async findAll(): Promise<SuccessResponseDto> {
    return await this.categoryService.findCategories();
  }

  @Patch(':id')
  @RequiredRoles([UserRoleEnum.ADMIN])
  async update(
    @Param() { id }: DocIdQueryDto,
    @Body() category: any,
  ): Promise<SuccessResponseDto> {
    console.log(category);
    return await this.categoryService.updateCategory(id);
  }

  @Delete(':categoryId')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  async remove(
    @Param() { categoryId }: DeleteCategoryDto,
  ): Promise<SuccessResponseDto> {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
