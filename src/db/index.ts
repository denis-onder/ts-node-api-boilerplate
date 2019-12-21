import mongoose from "mongoose";
import { db } from "../config";

async function connect() {
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  try {
    await mongoose.connect(db.connection, config);
    console.log("Connected to the database!");
  } catch (error) {
    this.stop(error);
  }
}

export { connect };
