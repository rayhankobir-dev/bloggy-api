import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { IsPublic } from './guard/authentication.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  @IsPublic()
  @ApiResponse({
    status: 201,
    type: SuccessResponseDto,
  })
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
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

  // @Post('refresh-token')
  // @HttpCode(200)
  // @IsPublic()
  // @ApiResponse({
  //   status: 200,
  //   type: SuccessResponseDto,
  // })
  // refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshToken(refreshTokenDto);
  // }

  // @Post('logout')
  // @HttpCode(200)
  // @IsPublic()
  // @ApiResponse({
  //   status: 200,
  //   type: SuccessResponseDto,
  // })
  // logout() {
  //   return this.authService.logout();
  // }

  // @Post('reset-password')
  // @HttpCode(200)
  // @IsPublic()
  // @ApiResponse({
  //   status: 200,
  //   type: SuccessResponseDto,
  // })
  // resetPassword() {
  //   return this.authService.resetPassword();
  // }

  // @Get('profile')
  // @HttpCode(200)
  // @ApiResponse({
  //   status: 200,
  //   type: SuccessResponseDto,
  // })
  // profile(@AuthUserId() { userId }: ITokenPayload) {
  //   return this.authService.profile(userId);
  // }
}
