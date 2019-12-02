import { Application } from "express";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import morgan from "morgan";

export default (app: Application): void => {
  const path = resolve(__dirname, "../../logs");
  if (!existsSync(path)) mkdirSync(path);
  const stream = createWriteStream(join(path, "access.log"), { flags: "a" });
  app.use(morgan("combined", { stream }));
};
