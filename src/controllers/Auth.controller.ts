import { Request, Response } from "express";
import { UserInterface, SuperRequest } from "../interfaces";
import { compareSync } from "bcrypt";
import User from "../db/models/User.model";
import CustomException from "../helpers/CustomException";
import hashPassword from "../helpers/hashPassword";
import generateToken from "../helpers/generateToken";
import registerUser from "../helpers/registerUser";

class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const user: UserInterface = await User.findOne({ email });
      if (user) throw new CustomException(403, "This email is already in use.");
      // Create user
      registerUser(
        email,
        { givenName: first_name, familyName: last_name },
        password,
        false,
        (err, user) => {
          if (err) throw new CustomException(500, err);
          return res.status(200).json(user);
        }
      );
    } catch (err) {
      /**
       * Concept:
       * If we throw a custom exception, use the provided info from it.
       * Otherwise just resolve into a 500 HTTP code,
       * and return whatever error gets passed into the block.
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
      if (!match) throw new CustomException(422, "Invalid password.");
      // Generate token
      const token = generateToken(user);
      // Return the generated token
      return res.status(200).json({ loggedIn: true, token });
    } catch (err) {
      return res.status(err.status || 500).json(err.message || err);
    }
  }
  public getCurrentUser(req: SuperRequest, res: Response) {
    const { id, email, first_name, last_name, createdAt } = req.user;
    return res.status(200).json({
      id,
      email,
      first_name,
      last_name,
      createdAt
    });
  }
  public async edit(req: SuperRequest, res: Response) {
    try {
      const user: UserInterface = await User.findById(req.user.id);
      if (!user) throw new CustomException(404, "User not found.");
      const { first_name, last_name, email, password } = req.body;
      // Edit user
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.password = hashPassword(password);
      // Save and return
      await user.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(err.status || 500).json(err.message || err);
    }
  }
  public async delete(req: SuperRequest, res: Response) {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    await user.remove();
    return res.status(200).json({ deleted: true, timestamp: Date.now() });
  }
  public generateJWTfromOAuth(req: SuperRequest, res: Response) {
    const token = generateToken(req.user);
    return res.status(200).json({
      loggedIn: true,
      token
    });
  }
}

export default new AuthController();
