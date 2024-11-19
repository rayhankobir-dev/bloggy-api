import { ValidationProvider } from './utils/providers/validation.provider';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';
import { AuthModule } from './modules/auth/auth.module';
import { TagModule } from './modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    BlogModule,
    CategoryModule,
    TagModule,
    CommentModule,
    AuthModule,
    EncryptionModule,
    CloudinaryModule,
  ],
  providers: [ValidationProvider],
})
export class AppModule {}
