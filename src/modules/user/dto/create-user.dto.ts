import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleDtoEnum } from '../enum/user-role.enum';

export class CreateUserDto {
  @ApiProperty({ description: "User's full name", required: false })
  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  fullName?: string;

  @ApiProperty({ description: "User's email", example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: "User's password", example: 'Password123!' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    description: "User's role",
    enum: UserRoleDtoEnum,
    example: UserRoleDtoEnum.AUTHOR,
    default: UserRoleDtoEnum.AUTHOR,
  })
  @IsOptional()
  @IsEnum(UserRoleDtoEnum, { message: 'Invalid user role' })
  role: UserRoleDtoEnum;
}
