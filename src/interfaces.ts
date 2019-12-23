import { Request } from "express";
import { Document } from "mongoose";

export interface RegistrationValidationError {
  firstNameEmpty?: String;
  lastNameEmpty?: String;
  emailEmpty?: String;
  emailNotValid?: String;
  passwordEmpty?: String;
  confirmPasswordEmpty?: String;
  passwordLength?: String;
  passwordsNotMatching?: String;
}

export interface UserInterface extends Document {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  createdAt?: string;
}

export interface SuperRequest extends Request {
  user?: UserInterface;
}
