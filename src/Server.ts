import express, { Application } from "express";
import config from "./config";

class Server {
  private app: Application = express();
  private port: number = config.server.port;
  private env: string = config.server.env;
  public start(): void {
    this.app.listen(this.port, err =>
      err
        ? this.stop(err)
        : console.log(
            `Server running!\nhttp://localhost:${this.port}\nEnvironment: ${this.env}`
          )
    );
  }
  public stop(err = false): void {
    let code = 0;
    if (err) {
      code = 1;
      console.error("An error has occured! \n", err);
    } else {
      console.log("Server shutting down...");
    }
    process.exit(code);
  }
}

export default new Server();
