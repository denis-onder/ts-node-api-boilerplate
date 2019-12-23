import isEmpty from "../helpers/isEmpty";
import emailRegex from "./emailRegex";
import { LoginValidationError } from "../interfaces";

// Error messages
import { EMAIL_EMPTY, EMAIL_INVALID, PASSWORD_EMPTY } from "./errors";

export default ({ email, password }) => {
  // Define an error object
  let errors: LoginValidationError = {};
  // Email
  if (isEmpty(email)) errors.emailEmpty = EMAIL_EMPTY;
  if (!emailRegex.test(email)) errors.emailNotValid = EMAIL_INVALID;
  // Password
  if (isEmpty(password)) errors.passwordEmpty = PASSWORD_EMPTY;
  // Return errors if any, else return false.
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return false;
  }
};
