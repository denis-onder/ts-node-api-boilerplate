import mongoose from "mongoose";
import { db } from "../config";

async function connect() {
  try {
    await mongoose.connect(db.connection, db.config);
    console.log("Connected to the database!");
  } catch (error) {
    this.stop(error);
  }
}

export { connect };
