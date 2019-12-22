import { Request, Response } from "express";
import User from "../db/models/User.model";
import CustomException from "../helpers/CustomException";

class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) throw new CustomException(403, "This email is already in use.");
      // Create user
      const new_user = new User({
        first_name,
        last_name,
        email,
        password
      });
      await new_user.save();
      return res.status(200).json(new_user);
    } catch (err) {
      /**
       * Concept:
       * If we throw a custom exception, use the provided info from it.
       * Otherwise just resolve into a 500 HTTP code,
       * and return whatever error gets passed into  the block.
       */
      return res.status(err.status || 500).json(err.message || err);
    }
  }
}

export default new AuthController();
