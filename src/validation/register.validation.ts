import isEmpty from "../helpers/isEmpty";
import emailRegex from "./emailRegex";
import { RegistrationValidationError } from "../interfaces";

// Error messages
import {
  FIRST_NAME_EMPTY,
  LAST_NAME_EMPTY,
  CONFIRM_PASSWORD_EMPTY,
  EMAIL_EMPTY,
  EMAIL_INVALID,
  PASSWORDS_NOT_MATCHING,
  PASSWORD_EMPTY,
  PASSWORD_NOT_LONG_ENOUGH
} from "./errors";

export default ({
  first_name,
  last_name,
  email,
  password,
  confirm_password
}) => {
  // Define an error object
  let errors: RegistrationValidationError = {};
  // First and last names
  if (isEmpty(first_name)) errors.firstNameEmpty = FIRST_NAME_EMPTY;
  if (isEmpty(last_name)) errors.lastNameEmpty = LAST_NAME_EMPTY;
  // Email
  if (isEmpty(email)) errors.emailEmpty = EMAIL_EMPTY;
  if (!emailRegex.test(email)) errors.emailNotValid = EMAIL_INVALID;
  // Password
  if (isEmpty(password)) errors.passwordEmpty = PASSWORD_EMPTY;
  if (isEmpty(confirm_password))
    errors.confirmPasswordEmpty = CONFIRM_PASSWORD_EMPTY;
  if (password.length < 8) errors.passwordLength = PASSWORD_NOT_LONG_ENOUGH;
  if (password !== confirm_password)
    errors.passwordsNotMatching = PASSWORDS_NOT_MATCHING;
  // Return errors if any, else return false.
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return false;
  }
};
