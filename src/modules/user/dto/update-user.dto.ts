import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: "User's email", required: false })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "User's full name", required: false })
  @IsString({ message: 'Full name must be a string' })
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: "User's profile picture",
    required: false,
    type: 'file',
  })
  @IsOptional()
  profilePicture?: Express.Multer.File;
}
