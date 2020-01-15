import { OAuth2Strategy } from "passport-google-oauth";
import { google } from "../../config";
import User from "../../db/models/User.model";
import registerOAuthUser from "../../helpers/registerOAuthUser";
import CustomException from "../../helpers/CustomException";

export default new OAuth2Strategy(google, async (_, __, profile, done) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ clientID: profile.id });
    if (user) return done(null, user);
    const { value: email } = profile.emails[0];
    const emailInUse = await User.findOne({ email });
    if (emailInUse)
      throw new CustomException(403, "This email addresss is in use.");
    // Create a new user
    registerOAuthUser(email, profile.id, (err, account) => {
      if (err) return done(err, false);
      return done(null, account);
    });
  } catch (error) {
    return done(error, false);
  }
});
