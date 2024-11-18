import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthUserId } from '../auth/decorator/auth-user-id.decorator';
import { RequiredRoles } from '../user/decorator/roles.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IsPublic } from '../auth/guard/authentication.guard';
import { UserRoleEnum } from '../user/enum/user-role.enum';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  async create(
    @Body() categoryDto: CreateCategoryDto,
    @AuthUserId() { userId }: ITokenPayload,
  ): Promise<SuccessResponseDto> {
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
  async update(id: string): Promise<SuccessResponseDto> {
    return await this.categoryService.updateCategory(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  async remove(id: string): Promise<SuccessResponseDto> {
    return await this.categoryService.deleteCategory(id);
  }
}
