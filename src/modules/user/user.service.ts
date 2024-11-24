import { EncryptionService } from '../encryption/encryption.service';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { ListUserQuery } from './dto/list-user-query.dto';
import { PaginatedResponseDto } from '../common/dto/paginate-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(userCreateDto: CreateUserDto): Promise<SuccessResponseDto> {
    try {
      userCreateDto['password'] = await this.encryptionService.hashPassword(
        userCreateDto.password,
      );

      const user = await this.userRepository.create(userCreateDto);

      return new SuccessResponseDto('User created successfully', user);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Error creating new document:', error.description);
      throw new BadRequestException('Error creating new document');
    }
  }

  async findAll({
    page = 1,
    limit = 10,
    name = '',
    email = '',
    role,
  }: ListUserQuery): Promise<PaginatedResponseDto> {
    try {
      const searchQuery: Record<string, any> = {};
      if (email) {
        searchQuery['email'] = { $regex: email, $options: 'i' };
      }
      if (name) {
        searchQuery['fullName'] = { $regex: name, $options: 'i' };
      }
      if (role) {
        searchQuery['role'] = role;
      }

      const totalRecords = await this.userRepository.count(searchQuery);
      const skip = (page - 1) * limit;

      const users = await this.userRepository.getAll(searchQuery, {
        limit,
        skip,
      });

      return new PaginatedResponseDto(totalRecords, page, limit, users);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Error fetching documents:', error.description);
      throw new BadRequestException('Error fetching documents');
    }
  }

  async deleteOne(userId: string): Promise<SuccessResponseDto> {
    try {
      const user = await this.userRepository.removeOneById(userId);
      return new SuccessResponseDto('User deleted successfully', user);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Error deleting document:', error.description);
      throw new BadRequestException('Error deleting document');
    }
  }

  async updateProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponseDto> {
    try {
      const { profilePicture, ...otherDetails } = updateUserDto;
      let uploadedProfilePicture: string | undefined;

      if (profilePicture) {
        uploadedProfilePicture =
          await this.cloudinaryService.uploadSingleImage(profilePicture);
      }

      const updatedUser = await this.userRepository.updateOneById(userId, {
        ...otherDetails,
        ...(uploadedProfilePicture && {
          profilePicture: uploadedProfilePicture,
        }),
      });

      return new SuccessResponseDto('User updated successfully', updatedUser);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Error updating profile:', error.description);
      throw new BadRequestException('Failed to update profile');
    }
  }
}
