import { Application } from "express";
import { API_ROUTER, VIEW_ROUTER } from "../Router";

export default (app: Application): void => {
  app.use("/api", API_ROUTER);
  app.use("/", VIEW_ROUTER);
};
