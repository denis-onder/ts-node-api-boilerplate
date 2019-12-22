import registrationValidation from "./register.validation";

class Validator {
  public register(data) {
    return registrationValidation(data);
  }
}

export default new Validator();
