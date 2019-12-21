import { Schema } from "mongoose";
import generator from "./model.generator";

const schema = new Schema({
  username: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  class: {
    type: String,
    required: true
  },
  realm: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  faction: {
    type: String,
    required: true
  }
});

export default generator("user", schema);
