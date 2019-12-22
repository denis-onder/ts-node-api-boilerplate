import isEmpty from "../helpers/isEmpty";
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

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
