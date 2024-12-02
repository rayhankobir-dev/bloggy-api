import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { IsPublic } from './guard/authentication.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthUserId } from './decorator/auth-user-id.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @IsPublic()
  @ApiResponse({
    status: 201,
    type: SuccessResponseDto,
  })
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  @HttpCode(200)
  @IsPublic()
  @ApiResponse({
    status: 200,
    type: SuccessResponseDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(200)
  @IsPublic()
  @ApiResponse({
    status: 200,
    type: SuccessResponseDto,
  })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('reset-password')
  @HttpCode(200)
  @IsPublic()
  @ApiResponse({
    status: 200,
    type: SuccessResponseDto,
  })
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @AuthUserId() { userId }: ITokenPayload,
  ) {
    return this.authService.resetPassword(resetPasswordDto, userId);
  }

  @Get('profile')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SuccessResponseDto,
  })
  profile(@AuthUserId() { userId }: ITokenPayload) {
    return this.authService.getLooginUser(userId);
  }
}
