import { UserDocument } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  user?: UserDocument;

  constructor(accessToken: string, refreshToken: string, user?: UserDocument) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (user) {
      this.user = user;
    }
  }
}
