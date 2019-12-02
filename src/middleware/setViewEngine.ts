import express, { Application } from "express";
import { join } from "path";
import hbs from "express-handlebars";

export default (app: Application) => {
  app.use(express.static(join(__dirname, "../../public")));
  app.set("views", join(__dirname, "../../views"));
  app.engine(
    "hbs",
    hbs({
      extname: "hbs",
      defaultLayout: "default",
      layoutsDir: join(__dirname, "../../views/layouts"),
      partialsDir: join(__dirname, "../../views/partials")
    })
  );
  app.set("view engine", "hbs");
};
