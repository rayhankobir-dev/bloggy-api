import { Tag, TagSchema } from './entities/tag.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './tag.controller';
import { UserModule } from '../user/user.module';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    UserModule,
  ],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagRepository],
})
export class TagModule {}
