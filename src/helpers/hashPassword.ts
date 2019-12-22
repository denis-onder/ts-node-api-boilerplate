import { hashSync } from "bcrypt";

export default (password: String) => hashSync(password, 14);
