import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { HydratedDocument, Types, Model } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;
export type TagType = Model<TagDocument>;

@Schema({
  timestamps: true,
})
export class Tag {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name, default: null })
  createdBy: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
