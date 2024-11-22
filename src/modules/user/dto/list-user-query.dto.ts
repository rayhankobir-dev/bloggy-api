import { Pagination } from 'src/modules/common/dto/panigation.dto';
import { UserRoleDtoEnum } from '../enum/user-role.enum';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ListUserQuery extends Pagination {
  @ApiProperty({
    description: 'Email of the user',
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly email?: string;

  @ApiProperty({
    description: 'Name of the user',
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty({
    description: "User's role",
    enum: UserRoleDtoEnum,
    required: false,
  })
  @IsOptional()
  public readonly role?: UserRoleDtoEnum;
}
