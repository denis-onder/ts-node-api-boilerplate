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
