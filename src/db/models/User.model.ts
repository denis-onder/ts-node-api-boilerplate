import { Schema } from "mongoose";
import uuid from "uuid";
import generator from "./model.generator";

const schema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  clientID: {
    type: String,
    unique: true,
    default: uuid.v4()
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default generator("user", schema);
