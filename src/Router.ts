import express from "express";
import passport from "passport";
import ViewController from "./controllers/View.controller";
import AuthController from "./controllers/Auth.controller";
import validateInput from "./middleware/validateInput";

class Router {
  /**
   * We are instantiating two separate routers here.
   * This is done for easier endpoint management,
   * and for logic separation
   */
  public API_ROUTER = express.Router();
  public VIEW_ROUTER = express.Router();
  constructor() {
    this.setAPIEndpoints();
    this.setViewEndpoints();
  }
  private setAPIEndpoints(): void {
    // Your API endpoints go here
    this.API_ROUTER.post(
      "/auth/register",
      validateInput,
      AuthController.register
    );
    this.API_ROUTER.post("/auth/login", AuthController.login);
    this.API_ROUTER.get(
      "/auth/me",
      passport.authenticate("jwt", { session: false }),
      AuthController.getCurrentUser
    );
  }
  private setViewEndpoints(): void {
    // Your view endpoints can be declared here
    this.VIEW_ROUTER.get("/", ViewController.renderRoot);
    this.VIEW_ROUTER.get("/docs", ViewController.renderDocs);
  }
}

const { API_ROUTER, VIEW_ROUTER } = new Router();

export { API_ROUTER, VIEW_ROUTER };
