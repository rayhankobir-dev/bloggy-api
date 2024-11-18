import { EncryptionService } from '../encryption/encryption.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { UserRepository } from '../user/user.repository';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly encryptionService: EncryptionService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpDto): Promise<SuccessResponseDto> {
    try {
      signUpDto.password = await this.encryptionService.hashPassword(
        signUpDto.password,
      );

      const user = await this.userRepository.create(signUpDto);
      const accessToken = await this.generateAccessToken(
        user.id.toString(),
        user.role,
      );

      const refreshToken = await this.createRefreshToken(user.id.toString());
      const tokenDto = new TokenResponseDto(accessToken, refreshToken, user);

      return new SuccessResponseDto('User registered successfully', tokenDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error creating user:`, error);
      throw new BadRequestException('Could not register user');
    }
  }

  async login(loginDto: LoginDto): Promise<SuccessResponseDto> {
    try {
      const user = await this.userRepository.getOneWhere({
        email: loginDto.email,
      });

      if (!user) {
        this.logger.error('No user found with this email: ', loginDto.email);
        throw new NotFoundException('No user found with this email');
      }

      const isMatched = await this.encryptionService.verifyPassword(
        loginDto.password,
        user.password,
      );

      if (!isMatched) {
        this.logger.error('Invalid credentials');
        throw new UnauthorizedException('Invalid credentials');
      }
      const accessToken = await this.generateAccessToken(
        user.id.toString(),
        user.role,
      );
      user.lastLoginAt = new Date();
      await user.save();

      const refreshToken = await this.createRefreshToken(user.id.toString());
      const tokenDto = new TokenResponseDto(accessToken, refreshToken, user);
      return new SuccessResponseDto('Authenticated successfully', tokenDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error authenticating user:`, error);
      throw new BadRequestException('Could not authenticate user');
    }
  }

  private async generateAccessToken(userId: string, userRole: string) {
    try {
      const tokenPayload: ITokenPayload = {
        userId,
        userRole,
      };

      return await this.jwtService.signAsync(tokenPayload);
    } catch (error) {
      this.logger.error('Error generating JWT token', error);
      throw new InternalServerErrorException('Error generating JWT token');
    }
  }

  private async createRefreshToken(userId: string): Promise<string> {
    try {
      const token = this.encryptionService.generateUniqueToken();

      const refreshToken = await this.refreshTokenRepository.create({
        token,
        user: userId,
      });

      return refreshToken.token;
    } catch (error) {
      this.logger.error('Error generating refresh token', error);
      throw new InternalServerErrorException('Error generating refresh token');
    }
  }
}
