import express, { Request, Response } from "express";
import ViewController from "./controllers/View.controller";

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
  }
  private setViewEndpoints(): void {
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
