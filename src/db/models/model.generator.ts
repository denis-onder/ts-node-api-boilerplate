import { model, Schema } from "mongoose";

export default (name: string, schema: Schema) => model(name, schema);
