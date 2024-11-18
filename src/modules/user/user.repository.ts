import { GenericRepository } from '../common/repository/generic.repository';
import { User, UserDocument, UserType } from './entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends GenericRepository<UserDocument> {
  private readonly logger: Logger;
  constructor(
    @InjectModel(User.name)
    private model: UserType,
  ) {
    const logger = new Logger(UserRepository.name);
    super(model, logger);
    this.logger = logger;
  }
}
