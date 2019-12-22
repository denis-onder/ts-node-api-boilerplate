import Validator from "../validation";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const path = req.path.split("/")[2];
  const inputErrors = Validator[path](req.body);
  inputErrors ? res.status(500).json(inputErrors) : next();
};
