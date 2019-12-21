import { server } from "./config";
import express, { Application } from "express";
import middleware from "./middleware";
import { connect } from "./db";

class Server {
  private app: Application = express();
  private port: number = server.port;
  private env: string = server.env;
  constructor() {
    middleware(this.app);
    // Establish a connection with the database.
    // connect.call(this);
  }
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
