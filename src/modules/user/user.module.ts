import { EncryptionModule } from '../encryption/encryption.module';
import { RolesGuardProvider } from './guards/user-roles.guard';
import { User, UserSchema } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EncryptionModule,
    CloudinaryModule,
  ],
  controllers: [UserController],
  providers: [RolesGuardProvider, UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
