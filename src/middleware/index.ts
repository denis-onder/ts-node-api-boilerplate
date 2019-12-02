import { Application } from "express";
import helmet from "helmet";
import { json, urlencoded } from "body-parser";
import logger from "./logger";
import setViewEngine from "./setViewEngine";
import router from "./router";

export default (app: Application): void => {
  app.use(helmet());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  setViewEngine(app);
  logger(app);
  router(app);
};
