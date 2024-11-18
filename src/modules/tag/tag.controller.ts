import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthUserId } from '../auth/decorator/auth-user-id.decorator';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredRoles } from '../user/decorator/roles.decorator';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { IsPublic } from '../auth/guard/authentication.guard';
import { UserRoleEnum } from '../user/enum/user-role.enum';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiProperty({ type: CreateTagDto })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  create(
    @Body() createTagDto: CreateTagDto,
    @AuthUserId() { userId }: ITokenPayload,
  ): Promise<SuccessResponseDto> {
    return this.tagService.createTag(createTagDto, userId);
  }

  @Get()
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @IsPublic()
  findAll(): Promise<SuccessResponseDto> {
    return this.tagService.findTags();
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  update(@Body() id: string): Promise<SuccessResponseDto> {
    return this.tagService.updateTag(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  remove(@Body() tagId: string): Promise<SuccessResponseDto> {
    return this.tagService.deleteTag(tagId);
  }
}
