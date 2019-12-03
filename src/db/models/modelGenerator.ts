import { database } from "../";

export default (name: string, attributes) => {
  return database.define(name, attributes);
};
