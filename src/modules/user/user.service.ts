import { EncryptionService } from '../encryption/encryption.service';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}
}
