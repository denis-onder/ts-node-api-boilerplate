import jwt from "jsonwebtoken";
import { server } from "../config";

export default ({ _id: id, email, first_name, last_name, createdAt }: any) => {
  const payload = {
    id,
    email,
    first_name,
    last_name,
    createdAt
  };
  const token = jwt.sign(payload, server.secret, {
    expiresIn: "1h"
  });
  return `Bearer ${token}`;
};
