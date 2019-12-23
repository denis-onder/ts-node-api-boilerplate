import jwt from "jsonwebtoken";
import { server } from "../config";

export default payload => {
  const token = jwt.sign(payload, server.secret, {
    expiresIn: "1h"
  });
  return `Bearer ${token}`;
};
