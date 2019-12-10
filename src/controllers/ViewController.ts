import { readFile } from "fs";
import { join } from "path";
import { Request, Response } from "express";
import showdown from "showdown";

class ViewController {
  private md = new showdown.Converter();
  public renderRoot(req: Request, res: Response): void {
    res.render("root", {
      title: "TypeScript Node API Boilerplate",
      css: "root",
      js: "root"
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
        : res.status(200).send(this.md.makeHtml(data));
    });
  }
}

export default new ViewController();
