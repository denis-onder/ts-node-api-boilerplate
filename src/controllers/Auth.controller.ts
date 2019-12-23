import { Request, Response } from "express";
import { UserInterface, SuperRequest } from "../interfaces";
import { compareSync } from "bcrypt";
import User from "../db/models/User.model";
import CustomException from "../helpers/CustomException";
import hashPassword from "../helpers/hashPassword";
import generateToken from "../helpers/generateToken";

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
        password: hashPassword(password)
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
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: UserInterface = await User.findOne({ email });
      if (!user) throw new CustomException(404, "This email is not in use.");
      // Check if the provided password is valid
      const match = compareSync(password, user.password);
      if (!match) throw new CustomException(403, "Invalid password.");
      // Generate token
      const token = generateToken({
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        createdAt: user.createdAt
      });
      // Return the generated token
      return res.status(200).json({ loggedIn: true, token });
    } catch (err) {
      return res.status(err.status || 500).json(err.message || err);
    }
  }
}

export default new AuthController();
