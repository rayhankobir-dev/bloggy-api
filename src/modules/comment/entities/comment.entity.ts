import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { HydratedDocument, Types, Model } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;
export type CommentType = Model<CommentDocument>;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: String, required: true, minlength: 1, maxlength: 255 })
  content: string;

  @Prop({ type: [Types.ObjectId], ref: Comment.name, default: [] })
  replies: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: User.name, default: null })
  commentBy: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
