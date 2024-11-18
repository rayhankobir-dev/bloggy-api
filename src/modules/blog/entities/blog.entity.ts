import { Category } from 'src/modules/category/entities/category.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { HydratedDocument, Types, Model } from 'mongoose';
import { Tag } from 'src/modules/tag/entities/tag.entity';

export type BlogDocument = HydratedDocument<Blog>;
export type BlogType = Model<BlogDocument>;

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({ type: String, required: true, minlength: 10, maxlength: 255 })
  title: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, default: null })
  category: string;

  @Prop({ type: [Types.ObjectId], ref: Tag.name, default: [] })
  tags: string[];

  @Prop({ type: String, required: true })
  thumbnail: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name, default: null })
  author: string;

  @Prop({ type: Boolean, default: false })
  isPublished: boolean;

  @Prop({ type: [Types.ObjectId], ref: Comment.name, default: [] })
  comments: string[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
