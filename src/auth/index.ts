import { Application } from "express";
import passport from "passport";
import strategy from "./strategy";

export default (app: Application): void => {
  app.use(passport.initialize());
  passport.use(strategy);
};
