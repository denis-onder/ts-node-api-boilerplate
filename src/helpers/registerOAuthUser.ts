import { randomBytes } from "crypto";
import User from "../db/models/User.model";
import hashPassword from "./hashPassword";

export default async (email, callback, clientID) => {
  const password = randomBytes(32).toString("hex");
  try {
    const credentials = {
      email,
      password: hashPassword(password),
      clientID
    };
    const newUser = await User.create(credentials);
    callback(null, newUser);
  } catch (error) {
    callback(error, false);
  }
};
