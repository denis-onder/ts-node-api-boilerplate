import { Application } from "express";
import passport from "passport";
import jwtStrategy from "./strategies/jwt";
import googleStrategy from "./strategies/google";

export default (app: Application): void => {
  app.use(passport.initialize());
  // app.use(passport.session());
  [jwtStrategy, googleStrategy].forEach(s => passport.use(s));
};
