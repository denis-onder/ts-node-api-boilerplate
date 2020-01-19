import { randomBytes } from "crypto";
import User from "../db/models/User.model";
import hashPassword from "./hashPassword";

export default async (email, name, password, clientID, callback) => {
  try {
    let credentials: any = {
      email,
      clientID,
      first_name: name.givenName,
      last_name: name.familyName
    };
    // OAuth fallbacks
    credentials.password = hashPassword(
      password ? password : randomBytes(32).toString("hex")
    );
    if (clientID) credentials.clientID = clientID;
    const newUser = await User.create(credentials);
    callback(null, newUser);
  } catch (error) {
    callback(error, false);
  }
};
