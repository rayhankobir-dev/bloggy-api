import { PaginatedResponseDto } from '../common/dto/paginate-response.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { AuthUserId } from '../auth/decorator/auth-user-id.decorator';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredRoles } from './decorator/roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ListUserQuery } from './dto/list-user-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserRoleEnum } from './enum/user-role.enum';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { IsPublic } from '../auth/guard/authentication.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequiredRoles([UserRoleEnum.ADMIN])
  create(@Body() createUserDto: CreateUserDto): Promise<SuccessResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: PaginatedResponseDto })
  @IsPublic()
  findAll(@Query() query: ListUserQuery): Promise<PaginatedResponseDto> {
    return this.userService.findAll(query);
  }

  @Delete(':userId')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  deleteUser(@Param() { userId }: DeleteUserDto): Promise<SuccessResponseDto> {
    return this.userService.deleteOne(userId);
  }

  @Patch('update-profile')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('profilePicture'))
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() profilePicture: Express.Multer.File,
    @AuthUserId() { userId }: ITokenPayload,
  ): Promise<SuccessResponseDto> {
    updateUserDto.profilePicture = profilePicture;
    return this.userService.updateProfile(userId, updateUserDto);
  }
}
