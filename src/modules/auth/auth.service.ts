import { EncryptionService } from '../encryption/encryption.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { UserDocument } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserRoleEnum } from '../user/enum/user-role.enum';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly encryptionService: EncryptionService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<SuccessResponseDto> {
    try {
      signUpDto.password = await this.encryptionService.hashPassword(
        signUpDto.password,
      );

      const isUserExist = await this.userRepository.getOneWhere({
        email: signUpDto.email,
      });

      if (isUserExist) {
        this.logger.error('User already exists: ', signUpDto.email);
        throw new ConflictException('Email already in use!');
      }

      const user = await this.userRepository.create({
        ...signUpDto,
        role: UserRoleEnum.AUTHOR,
      });
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

  async refreshToken(refreshToken: string): Promise<SuccessResponseDto> {
    try {
      const refreshTokenDoc = await this.refreshTokenRepository.getOneWhere(
        {
          token: refreshToken,
          expiresAt: { $gt: new Date() },
        },
        {
          populate: [
            {
              path: 'user',
              select: 'role',
            },
          ],
        },
      );

      if (!refreshTokenDoc) {
        this.logger.error('Refresh token is invalid or expired');
        throw new BadRequestException('Refresh token is invalid or expired');
      }

      const userData = refreshTokenDoc?.user as unknown as UserDocument;

      const accessToken = await this.generateAccessToken(
        userData._id.toString(),
        userData.role,
      );

      const tokenDto = new TokenResponseDto(
        accessToken,
        refreshToken,
        userData,
      );

      return new SuccessResponseDto('Token refreshed successfully', tokenDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error refreshing token:`, error);
      throw new BadRequestException('Failed to refresh token');
    }
  }

  async getLooginUser(userId: string): Promise<SuccessResponseDto> {
    try {
      const user = await this.userRepository.getOneWhere({ _id: userId });
      if (!user) throw new NotFoundException('User not found');

      return new SuccessResponseDto('User fetched successfully', user);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error finding user:`, error);
      throw new BadRequestException('Failed to find user');
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
    userId: string,
  ): Promise<SuccessResponseDto> {
    try {
      const user = await this.userRepository.getOneById(userId);

      if (!user) throw new NotFoundException('User not found');

      if (
        !(await this.encryptionService.verifyPassword(
          resetPasswordDto.oldPassword,
          user.password,
        ))
      ) {
        this.logger.error(
          `User ${userId} tried to change password with an incorrect old password`,
        );
        throw new BadRequestException('Old Password is incorrect');
      }

      const hashedPassword = await this.encryptionService.hashPassword(
        resetPasswordDto.newPassword,
      );

      await this.userRepository.updateOneById(userId, {
        password: hashedPassword,
      });

      return new SuccessResponseDto('Password changed successfully');
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Error resetting password:`, error);
      throw new BadRequestException('Failed to reset password');
    }
  }
}
