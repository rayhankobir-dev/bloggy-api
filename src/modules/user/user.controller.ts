import { PaginatedResponseDto } from '../common/dto/paginate-response.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { RequiredRoles } from './decorator/roles.decorator';
import { ListUserQuery } from './dto/list-user-query.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserRoleEnum } from './enum/user-role.enum';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

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
  //   @RequiredRoles([UserRoleEnum.ADMIN])
  findAll(@Query() query: ListUserQuery): Promise<PaginatedResponseDto> {
    return this.userService.findAll(query);
  }

  @Delete(':userId')
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @RequiredRoles([UserRoleEnum.ADMIN])
  deleteUser(@Param() { userId }: DeleteUserDto): Promise<SuccessResponseDto> {
    return this.userService.deleteOne(userId);
  }
}
