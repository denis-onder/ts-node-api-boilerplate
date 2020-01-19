import { OAuth2Strategy } from "passport-google-oauth";
import { google } from "../../config";
import User from "../../db/models/User.model";
import registerUser from "../../helpers/registerUser";
import CustomException from "../../helpers/CustomException";

export default new OAuth2Strategy(google, async (_, __, profile, done) => {
  const { id: clientID } = profile;
  const { value: email } = profile.emails[0];
  try {
    // Check if the user exists
    const user = await User.findOne({ clientID });
    if (user) return done(null, user);
    // Create a new user
    registerUser(email, profile.name, false, clientID, (err, account) => {
      if (err) {
        throw new CustomException(500, err);
      }
      return done(null, account);
    });
  } catch (error) {
    return done(error, false);
  }
});
