import registrationValidation from "./register.validation";
import loginValidation from "./login.validation";

class Validator {
  public register(data) {
    return registrationValidation(data);
  }
  public login(data) {
    return loginValidation(data);
  }
  public edit(data) {
    // The edit endpoint goes throug the same validation as the registration one.
    return registrationValidation(data);
  }
}

export default new Validator();
