import { Comment, CommentSchema } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserModule,
  ],
  providers: [CommentService, CommentRepository],
  exports: [CommentRepository],
})
export class CommentModule {}
