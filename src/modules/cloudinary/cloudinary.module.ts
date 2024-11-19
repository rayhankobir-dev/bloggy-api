import { CloudinaryProvider } from 'src/utils/providers/cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
