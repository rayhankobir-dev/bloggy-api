import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  v2 as CloudinaryAPI,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async uploadSingleImage(file: Express.Multer.File): Promise<string> {
    try {
      if (!file) throw new BadRequestException('No image file provided');
      const uploadResult = await this.uploadImageToCloudinary(file);
      return uploadResult.url;
    } catch (error) {
      this.logger.error(`Error uploading to cloudinary:`, error);
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async uploadMultipleImages(files: Express.Multer.File[]): Promise<string[]> {
    try {
      if (!files || files.length === 0)
        throw new BadRequestException('No image files provided');

      const multipleImages = await Promise.all(
        files.map(async (image) => await this.uploadSingleImage(image)),
      );

      return multipleImages;
    } catch (error) {
      this.logger.error(`Error creating multiple images:`, error);

      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        'Failed to create multiple images',
      );
    }
  }

  async uploadImageToCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = CloudinaryAPI.uploader.upload_stream(
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            this.logger.error(
              `Failed to upload image to Cloudinary: ${error.message}`,
            );
            reject(error);
          } else if (!result) {
            const errorMessage = 'Upload result is undefined';
            this.logger.error(
              `Failed to upload image to Cloudinary: ${errorMessage}`,
            );
            reject(new Error(errorMessage));
          } else {
            resolve(result);
          }
        },
      );

      const stream = Readable.from(file[0].buffer);
      stream.pipe(uploadStream);
    });
  }
}
