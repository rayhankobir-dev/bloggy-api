import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({
    description: 'User id for deleting',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid user id' })
  readonly userId: string;
}
