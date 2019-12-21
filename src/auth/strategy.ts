import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { server } from "../config";
// import { User } from "../db/models/user";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: server.secret
};

export default new Strategy(opts, async ({ id }, done) => {
  try {
    // const user = await User.findOne({ where: { id } });
    // if (!user) return done(null, false);
    // return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});
