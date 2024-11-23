import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { HydratedDocument, Types, Model } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
export type CategoryType = Model<CategoryDocument>;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({ type: String, required: false, default: null })
  thumbnail: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true, default: null })
  createdBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
