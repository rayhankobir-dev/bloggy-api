import { EncryptionService } from './encryption.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
