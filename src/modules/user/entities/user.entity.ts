import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoleEnum } from '../enum/user-role.enum';
import { HydratedDocument, Model } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserType = Model<UserDocument>;
@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.password;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop({ type: String, required: true, minlength: 3, maxlength: 100 })
  fullName: string;

  @Prop({ type: String, default: null })
  profilePicture: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.AUTHOR,
  })
  role: string;

  @Prop({ type: String, default: null })
  verifiedAt: string;

  @Prop({ type: Date, default: Date.now })
  lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
