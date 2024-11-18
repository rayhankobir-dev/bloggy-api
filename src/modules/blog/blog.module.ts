import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { Blog, BlogSchema } from './entities/blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { BlogService } from './blog.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    UserModule,
    CategoryModule,
    TagModule,
    CommentModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogRepository],
})
export class BlogModule {}
