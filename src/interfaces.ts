import { Request } from "express";
import { Document } from "mongoose";

export interface LoginValidationError {
  emailEmpty?: String;
  emailNotValid?: String;
  passwordEmpty?: String;
}

export interface RegistrationValidationError extends LoginValidationError {
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

export interface SuperRequest extends Request {
  user?: IUser;
}
