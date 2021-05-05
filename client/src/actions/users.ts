export interface IUser {
  active?: boolean;
  id?: string;
  role?: string;
  email?: string;
  images?: [string];
  password?: string;
  passwordChangedAt?: Date;
}
