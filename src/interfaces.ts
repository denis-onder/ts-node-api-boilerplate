import { Request } from "express";
import { Document } from "mongoose";

export interface ILoginValidationError {
  emailEmpty?: String;
  emailNotValid?: String;
  passwordEmpty?: String;
}

export interface IRegistrationValidationError extends ILoginValidationError {
  firstNameEmpty?: String;
  lastNameEmpty?: String;
  confirmPasswordEmpty?: String;
  passwordLength?: String;
  passwordsNotMatching?: String;
}

export interface IUser extends Document {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  createdAt?: string;
}

export interface IRequest extends Request {
  user?: IUser;
}
