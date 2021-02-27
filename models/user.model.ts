import { Document, model, Schema } from 'mongoose';
import { hash } from 'bcryptjs';
import { IUser } from '../types';

type IUserDocument = Document & IUser;

const userSchema: Schema = new Schema(
  {
    email: { type: String, lowercase: true },
    username: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
});

function hashPassword(password: string): Promise<string> {
  return hash(password, 8);
}

export const User = model<IUserDocument>('User', userSchema);
