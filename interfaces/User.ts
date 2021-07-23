import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  photo?: string;
  images?: [string];
  password: string | undefined;
  active: boolean;
  role: string;
  lastEdited: Date | number;
  passwordChangedAt?: Date | number;
  passwordResetToken?: String;
  passwordResetExpires?: Date | number;
}
