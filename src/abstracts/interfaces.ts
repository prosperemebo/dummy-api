import { Model, ObjectId } from 'mongoose';
import { ResponseStatus } from './enums';

export interface AppErrorInterface {
  statusCode: number;
  isOperational: boolean;
  status: ResponseStatus;
  message: string;
}

export interface ResponseData {
  status: ResponseStatus;
  message?: string;
  results?: number;
  data?: any;
  token?: string;
  error?: any;
  stack?: any;
}

export interface ProductInterface {
  price: Number;
}

export interface UserInterface {
  _id: string | ObjectId;
  id: string | ObjectId;
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
  isPasswordCorrect: (candidatePassword: string, userPassword: string) => {};
  isPasswordChanged: (timestamp: number) => {};
  createPasswordResetToken: () => {};
}

export interface RequestQueryInterface {
  sort: string;
  fields: string;
  page: string;
  limit: string;
}
