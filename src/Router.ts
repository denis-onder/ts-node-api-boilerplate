import express, { Request, Response } from "express";
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
      (req: Request, res: Response): Promise<Response> =>
        AuthController.register(req, res)
    );
  }
  private setViewEndpoints(): void {
    // Your view endpoints can be declared here
    this.VIEW_ROUTER.get("/", (req: Request, res: Response): void =>
      ViewController.renderRoot(req, res)
    );
    this.VIEW_ROUTER.get("/docs", (req: Request, res: Response): void =>
      ViewController.renderDocs(req, res)
    );
  }
}

const { API_ROUTER, VIEW_ROUTER } = new Router();

export { API_ROUTER, VIEW_ROUTER };
