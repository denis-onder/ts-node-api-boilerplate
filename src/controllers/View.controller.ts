import { readFile } from "fs";
import { join } from "path";
import { Request, Response } from "express";
import { server } from "../config";
import showdown from "showdown";

const md = new showdown.Converter();

class ViewController {
  public renderRoot(req: Request, res: Response): void {
    res.render("root", {
      title: "TypeScript Node API Boilerplate",
      css: "root",
      js: "root",
      env: `${server.env[0].toUpperCase()}${server.env.substring(
        1,
        server.env.length
      )}`
    });
  }
  public renderDocs(req: Request, res: Response): void {
    const path = join(__dirname, "../../DOCS.md");
    readFile(path, "utf-8", (err, data) => {
      err
        ? res.status(500).json({
            error:
              "An error has occured whilst trying to parse the Markdown file."
          })
        : res.render("docs", {
            title: "Documentation",
            css: "docs",
            js: "docs",
            docs: md.makeHtml(data)
          });
    });
  }
}

export default new ViewController();
