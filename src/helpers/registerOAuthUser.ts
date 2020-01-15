import { randomBytes } from "crypto";
import User from "../db/models/User.model";
import hashPassword from "./hashPassword";

export default async (email, name, clientID, callback) => {
  const password = randomBytes(32).toString("hex");
  try {
    const credentials = {
      email,
      password: hashPassword(password),
      clientID,
      first_name: name.givenName,
      last_name: name.familyName
    };
    const newUser = await User.create(credentials);
    callback(null, newUser);
  } catch (error) {
    callback(error, false);
  }
};
